<template>
  <div ref="LNaviAnchorDemoRef" class="LNaviAnchorDemo">
    <LNaviAnchor
      ref="LNaviAnchorRef"
      class="myLNaviAnchor"
      :list="naviList"
      pad
      throttle
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
    </LNaviAnchor>

    <div v-for="item in naviList" :id="item.id" :key="item.id" class="menu-item">{{ item.id }}</div>
  </div>
</template>

<script setup lang="tsx">
// import LNaviAnchor from '@/components/LNaviAnchor/LNaviAnchor.vue';
import { LNaviAnchor } from '@/components/index';

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
const LNaviAnchorDemoRef = ref();
const LNaviAnchorRef = ref();
const naviList = ref<any[]>([
  { id: '菜单0', title: '菜单99', prefixFlag: true, suffixFlag: true },
  { id: '菜单1' },
  { id: '菜单2' },
  { id: '菜单3' },
  { id: '菜单4' },
]);

setTimeout(() => {
  naviList.value.push({ id: '菜单5' }, { id: '菜单6' }, { id: '菜单7' });
}, 1000);

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
    LNaviAnchorRef.value.init(LNaviAnchorDemoRef.value);
  });
});
</script>

<style lang="scss" src="./index.scss" scoped></style>
