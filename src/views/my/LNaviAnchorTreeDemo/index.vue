<template>
  <div ref="demoRef" class="LNaviAnchorTreeDemo">
    <!-- 导航锚点 -->
    <LNaviAnchorTree ref="LNaviAnchorTreeRef" class="myLNaviAnchorTree" :list="naviList">
      <!-- 可以不设置slot，因为存在slot默认值 -->
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <div class="line" v-if="data.id === LNaviAnchorTreeRef.currentId"></div>
          <span class="tips" v-if="data.prefixFlag">前缀</span>
          <span class="label" :class="{ active: data.id === LNaviAnchorTreeRef.currentId }">
            {{ data.label ?? data.id }}
          </span>
          <span class="tips" v-if="data.suffixFlag">后缀</span>
        </span>
      </template>
    </LNaviAnchorTree>

    <!-- 内容列表 -->
    <div v-for="item in naviList" :id="item.id" :key="item.id">
      <div class="menu-item">{{ item.id }}</div>
      <!-- 子项 -->
      <div class="menu-item" v-for="subItem in item?.children ?? []" :id="subItem.id" :key="subItem.id">
        {{ subItem.id }}
        <!-- 子子项 -->
        <div class="menu-item" v-for="subSubItem in subItem?.children ?? []" :id="subSubItem.id" :key="subSubItem.id">
          {{ subSubItem.id }}
        </div>
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
  { id: '菜单0', label: '菜单0的别名', suffixFlag: true },
  {
    id: '菜单1',
    children: [{ id: '菜单1-1', children: [{ id: '菜单1-1-1' }, { id: '菜单1-1-2' }] }, { id: '菜单1-2' }],
  },
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
  naviList.value.at(-1).prefixFlag = true;
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
