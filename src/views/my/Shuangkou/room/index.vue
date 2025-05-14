<template>
  <div class="room">
    <div class="player" v-for="(player, playerIndex) in players" :key="player?.name">
      <el-avatar :size="50" v-if="player?.name" :src="circleUrl" />
      <div class="player-name">{{ player?.name }}</div>
      <!-- <el-button type="success" :icon="Check" circle /> -->
      <el-button
        v-if="!player?.isReady"
        type="success"
        plain
        @click="emits('get-ready', roomInfo?.index, player?.name)"
      >
        准备
      </el-button>
    </div>
    <div class="table" :class="{ active: isActive }">
      pokerCard
      <pokerCard></pokerCard>
    </div>

    <div class="operate-wrapper">
      <el-button type="info" plain>退出</el-button>
    </div>
  </div>
</template>

<script setup lang="tsx">
// 分隔符
// ■■■■■■■■■■■■■■■■■■■■■■■■■■
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎
// --------------------------
import pokerCard from '../pokerCard/index.vue';

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
const emits = defineEmits(['get-ready']);

const circleUrl = inject('circleUrl');
const isActive = computed(() => {
  return props.roomInfo.players.every((item) => item.isReady);
});

const players = computed(() => {
  const indexOfMine = props.roomInfo.players.findIndex((item) => {
    return item.name === 'me';
  });

  const indexGap = indexOfMine - 2;

  const arr: any = [];
  props.roomInfo.players.map((item, index) => {
    arr[(index - indexGap + 4) % 4] = props.roomInfo.players[index];
  });
  return arr;
});

watch(
  () => props.roomInfo,
  (newVal) => {
    console.log('roomInfo', newVal);
  }
);
</script>

<style lang="scss" src="./index.scss" scoped></style>
