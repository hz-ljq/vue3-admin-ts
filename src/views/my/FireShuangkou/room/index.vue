<template>
  <div class="room" @dblclick="move">
    <div class="player" v-for="player in players" :key="player?.name">
      <div class="basic-info">
        <el-avatar :size="50" v-if="player?.name" :src="circleUrl" />
        <span class="player-name">{{ player?.name }}</span>
        <!-- <el-button type="success" :icon="Check" circle /> -->
        <el-button
          v-if="!player?.isReady"
          type="success"
          plain
          @click="emits('get-ready', roomInfo?.index)"
        >
          准备
        </el-button>
      </div>

      <div
        class="cards-wrapper"
        :style="{
          width: `${(playerCards[player.name].length - 1) * 24 + 100}px`,
        }"
        v-if="player?.name === 'me'"
      >
        <pokerCard
          :style="{
            left: `${index * 24}px`,
            top: card[2] ? '-20px' : '0px',
          }"
          :card="card"
          v-for="(card, index) in playerCards[player.name]"
          :key="index"
          @click="card[2] = !card[2]"
        />
      </div>
    </div>

    <div class="table-wrapper" :class="{ active: isActive }">
      <pokerCard
        :style="{
          left: `${index * 24}px`,
        }"
        :card="card"
        v-for="(card, index) in tableCards.cards"
        :key="index"
      />
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
import analyse, { suits, ranks } from './rules';
// import { validatePlay, comparePlay } from './rules-2';
// import { robotPlay } from './robotPlay';

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

const circleUrl = inject('circleUrl');

// 桌面上的牌
const tableCards = ref({
  cards: [],
  type: null,
});

const allCards: any = ref([]);
const playerCards: any = ref({});
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

// 扑克牌排序（从大到小）
function sort(arr: any[]) {
  return arr.sort((a, b) => {
    const indexA = ranks.indexOf(a[1]);
    const indexB = ranks.indexOf(b[1]);
    if (indexB === indexA) {
      return suits.indexOf(b[0]) - suits.indexOf(a[0]);
    } else {
      return indexB - indexA;
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
  props.roomInfo.players.map((item, index) => {
    let cards = [];
    if (allCards.value.length > 0) {
      cards = allCards.value.slice(index * 27, (index + 1) * 27);
    } else {
      cards = [];
    }

    const arr = cards.map((item: Array<any>) => {
      item[2] = false;
      return item; // 最后一个参数表示是否选中
    });
    // obj[item.name] = sort(arr);
    obj[item.name] = arr;
  });
  return obj;
}

// 出牌
function move() {
  // 选中的牌
  const arr = playerCards.value.me.filter((item) => {
    return item[2];
  });

  // 判断是否符合规则
  // ljq，测试数据
  const testCards = [...'345789JQKA'.split(''), 'JOKER', '10','JOKER'];
  // const testCards = ['JOKER', 'JOKER', 'joker'];
  const result = analyse(testCards, {
    type: tableCards.value.type,
    cards: tableCards.value.cards.map((item) => item[1]),
  });

  // const result = analyse(
  //   arr.map((item) => item[1]),
  //   {
  //     type: tableCards.value.type,
  //     cards: tableCards.value.cards.map((item) => item[1]),
  //   }
  // );
  if (result.result) {
    tableCards.value = {
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

allCards.value = generateRandomCards();
playerCards.value = allocationCard();
onMounted(async () => {
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
    delay: stagger(100, { from: 'center' }),
    loop: false,
    complete: function (anim) {
      console.log('全部动画完成');
      // fixme-ljq,这个回调的时机不对
      for (const key in playerCards.value) {
        playerCards.value[key] = sort(playerCards.value[key]);
      }
    },
  });

  // 理牌
  setTimeout(() => {}, 1000);
});

// setInterval(() => {
//   const cardToMove = robotPlay(
//     playerCards.value.me.map((item) => {
//       return item[1];
//     }),
//     tableCards.value.map((item) => {
//       return item[1];
//     }),
//     validatePlay,
//     comparePlay
//   );

//   // 选中要出的牌
//   if (cardToMove.length) {
//     playerCards.value.me.map((item) => {
//       const index = cardToMove.indexOf(item[1]);
//       if (index > -1) {
//         cardToMove.splice(index, 1);
//         item[2] = true;
//       }
//     });

//     // 出牌
//     setTimeout(move, 500);
//   } else {
//     tableCards.value = [];
//   }
// }, 1000);

// todo-ljq，打牌规则rules；
// todo-ljq，牌分配时，洗牌动画和排序同时进行；
// todo-ljq，出牌时，【自己的牌变少了，桌面的牌多了】进行渐变动画；
// todo-ljq，机器人出牌（在符合打牌规则的前提下，设置一定的随机性）；

// todo-ljq，大小王改为joker和JOKER；
</script>

<style lang="scss" src="./index.scss" scoped></style>
