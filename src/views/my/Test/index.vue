<template>
  <div id="canvas" ref="title" :style="style">
    <span v-if="flag" ref="test" id="test" style="color: blue" @click="title1 = 'uuo'">Test</span>
    <div v-for="(value, index) in aaa" :key="index">
      <div class="bbb" :class="{ active: value % 2 }">{{ value }}</div>
    </div>

    <Child ref="childRef" v-model:title1.capitalize="title1" @abc="abc" :style="style"></Child>
  </div>
</template>

<script setup lang="tsx" name="tmp">
// 分隔符
// ■■■■■■■■■■■■■■■■■■■■■■■■■■
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎
// --------------------------

import Child from './Child/index.vue';

import {
  // -----------------------数据定义
  ref,
  reactive,
  toRefs,

  // -----------------------provide、inject
  provide,
  inject,

  // -----------------------slots、attrs
  useSlots,
  useAttrs,

  // -----------------------watch、watchEffect、computed
  watch,
  watchEffect,
  computed,

  // -----------------------其他（尽量不要用）
  getCurrentInstance,

  // -----------------------生命周期（常用）
  // 挂载前
  onBeforeMount,
  // 挂载后
  onMounted,
  // 卸载前
  onBeforeUnmount,
} from 'vue';

const abc = () => {
  console.log('abc');
};

const flag = ref(true);
const title = ref();
const title1 = ref('');
const childRef = ref();
const test = ref();
const style = reactive({
  color: 'gray',
});

const aaa = ref([1, 2, 3]);

onMounted(async () => {
  console.log(124);
  // childRef.value.a.value = 100
});
const createCounter = () => {
  let count = 0
  return () => {
    count++;
    return count;
  };
};
const counter = createCounter();		// 虽然 createCounter 执行完了，但 count 的作用域并没有被销毁；
console.log(counter());			// 1
console.log(counter());			// 2
</script>

<style lang="scss" src="./index.scss" scoped></style>
