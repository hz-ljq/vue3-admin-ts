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
      <room v-if="isOpen" :roomInfo="currentRoom" @get-ready="handleReady" @quit="quit" />
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
const tableArr: any = ref([
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
const playerName = ref('me');
provide('playerName', playerName);

const isOpen = ref(false);
const currentRoom: any = ref({
  tableName: 'xxx',
  players: [],
});

const toTable = (tableIndex: number, playerIndex: number) => {
  tableArr.value[tableIndex].players[playerIndex].name = playerName.value;
  currentRoom.value = {
    ...tableArr.value[tableIndex],
  };

  isOpen.value = true;
};

const handleReady = (index: any) => {
  tableArr.value[index].players.map((item) => {
    if (item.name === playerName.value) {
      item.isReady = true;
      item.name = playerName.value;
    }
  });
};
const quit = (index: any) => {
  tableArr.value[index].players.map((item) => {
    if (item.name === playerName.value) {
      item.isReady = false;
      item.name = null;
    }
  });
  isOpen.value = false
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
