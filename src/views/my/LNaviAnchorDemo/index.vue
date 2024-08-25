<template>
  <div ref="demoRef" class="LNaviAnchorDemo">
    <!-- 导航锚点 -->
    <LNaviAnchorV2
      ref="LNaviAnchorRef"
      class="myLNaviAnchor"
      :list="naviList"
      pad
      :scrollSpeed="400"
      :afterScrollTo="afterScrollTo"
    >
      <!-- 可以不设置slot，因为存在slot默认值 -->
      <template #list-item="{ item, index }">
        <div class="item" :class="{ active: LNaviAnchorRef.currentId === item.id }">
          <span v-if="item.prefixFlag" class="tips">前缀</span>
          <span>{{ index }}-{{ item.title }}</span>
          <span v-if="item.suffixFlag" class="tips">后缀</span>
        </div>
      </template>
    </LNaviAnchorV2>

    <!-- 内容列表 -->
    <div v-for="item in naviList" :id="item.id" :key="item.id" class="menu-item">{{ item.id }}</div>
  </div>
</template>

<script setup lang="tsx">
// import LNaviAnchor from '@/components/LNaviAnchor/LNaviAnchor.vue';
import { LNaviAnchor, LNaviAnchorV2 } from '@/components/index';

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
const demoRef = ref();
const LNaviAnchorRef = ref();
const naviList = ref<any[]>([
  { id: '菜单0', title: '菜单99', prefixFlag: true, suffixFlag: true },
  { id: '菜单1' },
  { id: '菜单2' },
  { id: '菜单3' },
  { id: '菜单4' },
]);

// 动态修改
setTimeout(() => {
  naviList.value.push({ id: '菜单5' }, { id: '菜单6' }, { id: '菜单7' });
}, 1000);

// 动态修改
setTimeout(() => {
  naviList.value.at(-1).suffixFlag = true;
}, 2000);

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ methods
function afterScrollTo() {
  console.log(LNaviAnchorRef.value.currentId, '滚动完毕');
  // setTimeout(() => {
  //   console.log(LNaviAnchorRef.value.currentId, '滚动完毕');
  // }, 1000);
}

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ other
onMounted(() => {
  nextTick(() => {
    LNaviAnchorRef.value?.init(demoRef.value);
  });
});
</script>

<style lang="scss" src="./index.scss" scoped></style>
