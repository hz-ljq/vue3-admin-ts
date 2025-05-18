<template>
  <div class="Shuangkou">
    <hobby></hobby>
    <!-- <room></room> -->
  </div>
</template>

<script setup lang="tsx" name="Shuangkou">
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
} from 'vue';

import hobby from './hobby/index.vue';
import room from './room/index.vue';

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
// ● Hooks
// import myHooks from "@/myHooks";
// const { someData, someMethod } = myHooks();

// ● vue-router
// import { useRouter, useRoute } from "vue-router";
// const router = useRouter();
// const route = useRoute();
// let { id } = route.query;
// router.push({
//   path: "/detail",
//   query: { id },
// });

// ● props
// （ts写法）
const props = withDefaults(defineProps<{
  msg?: string;
  labels?: string[];
}>(), {
  msg: 'hello',
  labels: () => ['one', 'two'],
});
// （js写法）
// const props = defineProps({
//   prop1: {
//     type: String,
//     default: '设置默认值'
//   }
// })

// ● emits
const emits = defineEmits(['xxx']);
emits('xxx', 'payload');

// ● slots
const slots = useSlots();
console.log(slots.default);

// ● attrs
const attrs = useAttrs();
console.log(attrs);

// ● ref
const data1 = ref(100);

// ● reactive
const data2 = reactive({ param1: '', param2: [1] });

// ● toRefs
const { param1 } = toRefs(data2);

// ● computed
const count = ref(100);
const double = computed(() => {
  return count.value * 2;
});
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ methods
// ...
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ other
// ● watch、watchEffect
const stop = watch(
  data1,
  (newVal, oldVal, onInvalidate) => {
    console.log('123');
    const timer = setTimeout(() => {
      console.log('网络请求成功');
    }, 1000);
    onInvalidate(() => {
      // 在监听器的副作用的下一次重新执行前调用
      clearTimeout(timer);
    });
  },
  // 选项options
  {
    deep: true, // 深度监视，默认是false
    // immediate: true,	// 初始化立即执行一次，默认是false
    // flush: "pre",		// 指定调度器，即何时运行副作用函数。可选值【"pre", "sync", "post"】，默认值"pre"。
  }
);
// stop(); // 停用监听

watch(data2, () => {
  console.log('data2，发生变化');
});
watch(
  () => data2.param1,
  () => {
    console.log('data2.param1，发生变化');
  }
);
watch(
  () => data2.param2,
  () => {
    console.log('data2.param2，发生变化');
  },
  { deep: true }
);

// ● 挂载前
onBeforeMount(() => {
  console.log('--onBeforeMount');
});

// ● 挂载后
onMounted(() => {
  console.log('--onMounted');
});

// ● 卸载前
onBeforeUnmount(() => {
  console.log('--onBeforeUnmount');
});

// ● provide
const title1 = ref('我是全局标题');
provide('gTitle1', title1);

// ● inject
// const title2 = inject("gTitle2");

// ● defineExpose（暴露到组件外部）
defineExpose({
  data1,
});
</script>

<style lang="scss" src="./index.scss" scoped></style>
