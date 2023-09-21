<template>
  <div ref="demoRef" class="LNaviAnchorTreeDemo">
    <LNaviAnchorTree ref="LNaviAnchorTreeRef" class="myLNaviAnchorTree" :list="naviList" />

    <div v-for="item in naviList" :id="item.id" :key="item.id">
      <div class="menu-item">{{ item.id }}</div>
      <div class="menu-item" v-for="subItem in item?.children ?? []" :id="subItem.id" :key="subItem.id">
        {{ subItem.id }}
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { LNaviAnchorTree } from '@/components/index';

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
const demoRef = ref();
const LNaviAnchorTreeRef = ref();
const naviList = ref<any[]>([
  { id: '菜单0', label: '菜单99', prefixFlag: true, suffixFlag: true },
  { id: '菜单1', children: [{ id: '菜单1-1' }, { id: '菜单1-2' }] },
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
  console.log(LNaviAnchorTreeRef.value.currentId, '滚动完毕');
  // setTimeout(() => {
  //   console.log(LNaviAnchorTreeRef.value.currentId, '滚动完毕');
  // }, 1000);
}

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ other
onMounted(() => {
  nextTick(() => {
    LNaviAnchorTreeRef.value.init(demoRef.value);
  });
});
</script>

<style lang="scss" src="./index.scss" scoped></style>
