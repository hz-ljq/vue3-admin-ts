<template>
  <div id="child">
    <span v-on="$attrs">我是child-{{ a }}</span>
    <!--
    <div v-for="(value, index) in 10000" :key="index">
      <span>{{ index }}</span>
    </div> -->
    <div @click2="$attrs.onClick2">
      {{ title1 }}
    </div>

    <!-- <el-input v-model="title1" style="width: 240px" placeholder="Please input" /> -->
  </div>
</template>
<script lang="tsx">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="tsx" name="child">
// 分隔符
// ■■■■■■■■■■■■■■■■■■■■■■■■■■
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎
// --------------------------

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
  nextTick,
} from 'vue';

const myEmits = defineEmits(['click1']);

const attrs = useAttrs();
console.log(55, attrs);

const title = ref();
const a = ref(0);
const style = reactive({
  color: 'gray',
});

const aaa = ref([1, 2, 3]);

// const [title1, modifiers, ab] = defineModel('title1');
const title1 = defineModel('title1');
// title1.value = 'fdf'

// watch(
//   title1,
//   () => {
//     // console.log(999, title1.value);
//   }
// );

// setTimeout(() => {
//   title1.value = 'hjk';
// }, 2000);

onMounted(async () => {
  await nextTick();
  console.log('child');
});

defineExpose({
  a,
});

</script>

<style lang="scss" src="./index.scss" scoped></style>
