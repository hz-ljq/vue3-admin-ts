<template>
  <div id="room" class="room" @contextmenu.prevent="move" @dblclick="unselect">
    <div class="player" v-for="player in players" :key="player?.name">
      <div class="basic-info">
        <el-avatar :size="50" v-if="player?.name" :src="circleUrl" />
        <span class="player-name">{{ player?.name }}</span>
        <!-- <el-button type="success" :icon="Check" circle /> -->
        <el-button v-if="!player?.isReady" type="success" plain @click="ready">
          准备
        </el-button>
        <el-button
          v-if="player?.name === 'me'"
          type="success"
          plain
          @click="ready"
        >
          换牌
        </el-button>
        <el-button
          v-if="player?.name === 'me'"
          type="success"
          plain
          @click="ready"
        >
          提示
        </el-button>
      </div>

      <div
        class="cards-wrapper"
        v-if="player?.name === 'me'"
        :id="player?.name === 'me' ? 'my-cards-wrapper' : ''"
      >
        <TransitionGroup name="fade" @after-leave="transitionComplete">
          <pokerCard
            :style="{
              top: card[2] ? '-20px' : '0px',
            }"
            :card="card"
            v-for="(card, index) in playerCards[player.name]"
            :key="card[3]"
            :data-cardindex="index"
            :class="{
              'used-for-selectable':
                playerCards[player.name].length - 1 === index,
            }"
            :isLastCard="playerCards[player.name].length - 1 === index"
          />
        </TransitionGroup>
      </div>
    </div>

    <div class="table-wrapper" :class="{ active: isActive }">
      <!-- <pokerCard
        :style="{
          left: `${index * 24}px`,
        }"
        :card="card"
        v-for="(card, index) in tableCards[2].cards"
        :key="index"
      /> -->
      <!-- <div class="grid-item" v-for="item in 9" :key="item">
        <template v-if="item === 8">
          <pokerCard
            :style="{
              left: `${index * 24}px`,
            }"
            :card="card"
            v-for="(card, index) in tableCards[2].cards"
            :key="index"
          />
        </template>
      </div> -->
      <div
        v-for="(item, index) in tableCards"
        :key="index"
        class="item"
        :class="{
          top: index === 0,
          'mid-right': index === 1,
          bottom: index === 2,
          'mid-left': index === 3,
        }"
      >
        <div
          v-if="index === 2"
          class="cards-wrapper"
          :style="{ width: `${(item.cards?.length ?? 0) * 22 + (100 - 22)}px` }"
        >
          <TransitionGroup name="fade">
            <pokerCard
              :style="{
                left: `${cardIndex * 22}px`,
              }"
              :card="card"
              v-for="(card, cardIndex) in tableCards[2].cards"
              :key="card[3]"
            />
          </TransitionGroup>
        </div>
      </div>
    </div>

    <div class="operate-wrapper">
      <el-button type="info" plain @click="emits('quit', roomInfo?.index)">
        退出
      </el-button>
    </div>
  </div>
</template>

<script setup lang="tsx">
// 分隔符
// ■■■■■■■■■■■■■■■■■■■■■■■■■■
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎
// --------------------------
import pokerCard from '../pokerCard/index.vue';
import { animate, stagger } from 'animejs';
import analyse, { suits, ranks, autoMove } from './rules';
// import { validatePlay, comparePlay } from './rules-2';
// import { robotPlay } from './robotPlay';
import Selectable from 'selectable.js';

// ● props
const props = defineProps({
  roomInfo: {
    type: Object,
    default: () => {
      return {
        index: 0,
        name: '斗地主',
        players: [],
      };
    },
  },
});

// ● emits
const emits = defineEmits(['get-ready', 'quit']);

let selectable: any = null;
const circleUrl = inject('circleUrl');

// 桌面上的牌
const tableCards = ref([
  {},
  {},
  {
    cards: [],
    type: null,
  },
  {},
]);

const allCards: any = ref([]);
const playerCards: any = ref({ me: [] });
const isActive = computed(() => {
  return props.roomInfo.players.every((item) => item.isReady);
});

// 换位置，自己总是在桌子的南边
const players = computed(() => {
  const indexOfMine = props.roomInfo.players.findIndex((item) => {
    return item.name === 'me';
  });

  const indexGap = indexOfMine - 2; // 2是南边的索引

  const arr: any = [];
  props.roomInfo.players.map((item, index) => {
    arr[(index - indexGap + suits.length) % suits.length] =
      props.roomInfo.players[index];
  });
  return arr;
});

// 我方在出牌时，子元素过渡动画的次数
const transitionCount = ref(0);

// 扑克牌排序（默认从大到小）
function sort(arr: any[], direction = '倒序') {
  return arr.sort((a, b) => {
    const indexA = ranks.indexOf(a[1]);
    const indexB = ranks.indexOf(b[1]);
    if (indexB === indexA) {
      return suits.indexOf(b[0]) - suits.indexOf(a[0]);
    } else {
      return direction === '倒序' ? indexB - indexA : indexA - indexB;
    }
  });
}

// 生成2副扑克牌（共108张牌），顺序随机
function generateRandomCards() {
  let arr: any = [];

  ranks.slice(0, -2).map((rank) => {
    suits.map((suit) => {
      arr.push([suit, rank]);
    });
  });
  arr.push([null, 'joker'], [null, 'JOKER']);
  const arr2 = JSON.parse(JSON.stringify(arr)); // 深拷贝，以免互相关联
  return [...arr, ...arr2].sort(() => Math.random() - 0.5);
}

// 随机分配牌（每个玩家27张牌）
function allocationCard() {
  const obj = {};
  for (const x of props.roomInfo.players) {
    obj[x.name] = [];
  }
  props.roomInfo.players.map((player, index) => {
    let cards = [];
    if (allCards.value.length > 0) {
      cards = allCards.value.slice(index * 27, (index + 1) * 27);
    } else {
      cards = [];
    }

    const arr = cards.map((item: Array<any>, index) => {
      item[2] = false;
      // 如果TransitionGroup的key用index的话，在数据变化时，由于总是存在相同index的牌，导致过渡动画不完美；
      // 所以，添加item[3]，并设置为绝对唯一。它纯粹是给 TransitionGroup的key使用的，为了过渡动画效果完美呈现。
      item[3] = +new Date() * index;
      item[4] = false; // 显示牌的背面
      // obj[player.name].push(item);
      return item; // 最后一个参数表示是否选中
    });
    obj[player.name] = arr;
  });
  return obj;
}

// 出牌
function move() {
  // const myC = Array(4)
  //   .fill([
  //     '3',
  //     '4',
  //     '5',
  //     '6',
  //     '7',
  //     '8',
  //     '9',
  //     '10',
  //     'J',
  //     'Q',
  //     'K',
  //     'A',
  //     '2',
  //     'joker',
  //     'JOKER',
  //   ])
  //   .flat();

  // autoMove(myC, {
  //   type: '4相3连环炸弹',
  //   cards: ['3', '4', '5', '3', '4', '5', '3', '4', '5', '3', '4', '5'],
  // });

  // 选中的牌
  const arr = playerCards.value.me.filter((item) => {
    return item[2];
  });

  // 判断是否符合规则
  // ljq，测试数据
  // // const testCards = [...'345789JQKA'.split(''), 'JOKER', '10','JOKER'];
  // const testCards = [...'666655557778888'.split(''), 'JOKER'];
  // const previousCards = {
  //   type: '天王炸弹',
  //   cards: ['JOKER', 'JOKER', 'joker', 'joker']
  // };
  // const result = analyse(testCards, previousCards);

  const result = analyse(
    arr.map((item) => item[1]),
    {
      type: tableCards.value[2].type,
      cards: tableCards.value[2].cards?.map((item) => item[1]),
    }
  );
  if (result.result) {
    tableCards.value[2] = {
      cards: arr,
      type: result.type,
    };

    playerCards.value.me = playerCards.value.me.filter((item) => {
      return !item[2];
    });
  } else {
    console.log(result.tips);
  }
}

// 我方准备就绪
async function ready() {
  emits('get-ready', props.roomInfo?.index);
  allCards.value = generateRandomCards();
  playerCards.value = allocationCard();

  await nextTick();

  // 动画
  animate('.pokerCard', {
    boxShadow: [
      {
        to: stagger([1, 0.25], {
          // modifier: (v) => `0 0 ${v * 30}px ${v * 20}px currentColor`,
          modifier: (v) => `0 0 ${v * 30}px ${v * 20}px green`,
          from: 'center',
        }),
      },
      { to: 0 },
    ],
    delay: stagger(50, { from: 'center' }),
    loop: false,
    onComplete: function (anim) {
      // console.log('全部动画完成');
      // 理牌
      for (const key in playerCards.value) {
        playerCards.value[key].map((item) => {
          item[4] = true;
        });

        setTimeout(() => {
          playerCards.value[key] = sort(playerCards.value[key]);
        }, 800);
      }

      // 估算了相关动画的过渡时间。不这样的话，最后一张牌绑定不上class【‘ui-selectable’】，导致不能被框选；
      // fixme-ljq 研究下，看看有没有更好的解决办法。
      setTimeout(initSelectable, 1500);
    },
  });
}

onMounted(async () => {
  await nextTick();
  // // 动画
  // animate('.pokerCard', {
  //   boxShadow: [
  //     {
  //       to: stagger([1, 0.25], {
  //         // modifier: (v) => `0 0 ${v * 30}px ${v * 20}px currentColor`,
  //         modifier: (v) => `0 0 ${v * 30}px ${v * 20}px green`,
  //         from: 'center',
  //       }),
  //     },
  //     { to: 0 },
  //   ],
  //   delay: stagger(50, { from: 'center' }),
  //   loop: false,
  //   onComplete: function (anim) {
  //     // console.log('全部动画完成');
  //     // 理牌
  //     for (const key in playerCards.value) {
  //       playerCards.value[key] = sort(playerCards.value[key]);
  //     }
  //     // 1500，是计算了 TransitionGroup 的过渡时间。不这样的话，最后一张牌绑定不上class【‘ui-selectable’】，导致不能被框选；
  //     // fixme-ljq 研究下，看看有没有好的解决办法。
  //     setTimeout(initSelectable, 500);
  //     // initSelectable();
  //   },
  // });
});

// 取消任何牌的选中状态
function unselect() {
  playerCards.value.me.map((item) => {
    item[2] = false;
  });
}

// 初始化 selectable，用于牌的框选功能；
function initSelectable() {
  selectable?.destroy?.();
  selectable = new Selectable({
    // container: '#my-cards-wrapper',
    container: '#room',
    filter: '.used-for-selectable',
    lasso: {
      border: '2px dashed rgba(219, 10, 91, 1)',
      borderRadius: '10px',
      backgroundColor: 'rgba(219, 10, 91, 0.4)',
    },
  });
  selectable.on('end', function (e, selected, unselected) {
    console.log(55, selected);
    // 选牌
    selected.map((x) => {
      // console.log(555, x.node);
      const myCards = playerCards.value.me;
      const index =
        x.node.parentNode?.dataset?.cardindex ?? x.node?.dataset?.cardindex;
      console.log(555, myCards[index]);
      myCards[index][2] = !myCards[index][2];
    });
  });
  // console.log(33, selectable);
}

function transitionComplete() {
  console.log(7777);
  transitionCount.value++;
  // 所有子元素都完成过渡动画
  if (tableCards.value[2].cards?.length === transitionCount.value) {
    transitionCount.value = 0;
    // 每次出牌后，我方最后一张牌就不再绑定“ui-selectable”，这导致selectable功能失效。所以在牌发生变化后（也就是出牌后），重新初始化selectable；
    initSelectable();
  }
}

onBeforeUnmount(() => {
  selectable?.destroy?.();
});

// todo-ljq，机器人出牌（在符合打牌规则的前提下，设置一定的随机性）；
// todo-ljq，提示功能（寻找能压住对方牌型的最小牌型）；
</script>

<style lang="scss" src="./index.scss" scoped></style>
