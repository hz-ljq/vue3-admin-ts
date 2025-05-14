<template>
  <div class="hobby">
    <el-row :gutter="40">
      <el-col :span="4" v-for="(table, tableIndex) in tableArr" :key="table.index">
        <div class="group">
          <div class="player-avatar" v-for="(player, playerIndex) in table.players" :key="player.name">
            <el-avatar :size="50" v-if="player.name" :src="circleUrl"></el-avatar>
            <div v-else class="empty-seat" @click="toTable(tableIndex, playerIndex)">空座位</div>

            <div>{{ player.name }}</div>
          </div>
          <div class="table"></div>
        </div>
      </el-col>
    </el-row>
    <transition name="switch">
      <room v-if="isOpen" :roomInfo="roomInfo" @get-ready="handleReady" />
    </transition>
  </div>
</template>

<script setup lang="tsx">
// 分隔符
// ■■■■■■■■■■■■■■■■■■■■■■■■■■
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎
// --------------------------
import room from '../room/index.vue';

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
const tableArr = ref([
  {
    name: '斗地主1',
    index: 0,
    players: [
      { name: 'A', isReady: true },
      { name: 'B', isReady: true },
      { name: 'C', isReady: true },
      { name: null, isReady: false },
    ],
  },
]);

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
provide('circleUrl', circleUrl);
const isOpen = ref(false);
const roomInfo: any = ref({
  tableName: 'xxx',
  players: [],
});

const toTable = (tableIndex: number, playerIndex: number) => {
  const playerName = 'me';
  tableArr.value[tableIndex].players[playerIndex].name = playerName;
  roomInfo.value = {
    ...tableArr.value[tableIndex],
  };

  isOpen.value = true;
};

const handleReady = (index: any, name: string) => {
  tableArr.value[index].players.map((item) => {
    if (item.name === name) {
      item.isReady = true;
    }
  });
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
