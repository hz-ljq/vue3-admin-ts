<template>
  <el-form class="LForm" ref="formRef" v-bind="formOption.formParams" :model="formOption.form">
    <el-row :gutter="formOption.elRowGutter">
      <el-col :span="item.elColSpan" v-for="(item, index) in formOption.itemArr" :key="index">
        <el-form-item v-bind="item.elFormItemParams">
          <!-- el-input -->
          <template v-if="['el-input'].includes(item.compName)">
            <component :is="item.compName" v-bind="item.compParams" v-model="formOption.form[item.key]"></component>
          </template>

          <!-- el-select -->
          <template v-else-if="['el-select'].includes(item.compName)">
            <component :is="item.compName" v-bind="item.compParams" v-model="formOption.form[item.key]">
              <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </component>
          </template>

          <!-- el-radio-group -->
          <template v-else-if="['el-radio-group'].includes(item.compName)">
            <component :is="item.compName" v-bind="item.compParams" v-model="formOption.form[item.key]">
              <el-radio v-for="item in item.options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
            </component>
          </template>

          <!-- 自定义组件 -->
          <template v-else>
            <component :is="item.compName" v-bind="item.compParams"></component>
          </template>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item>
          <el-button
            v-for="(item, index) in formOption.btnArr"
            :key="index"
            :type="item.elButtonType"
            @click="item.clickHandler"
          >
            {{ item.name }}
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="tsx">
// // 分隔符
// // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
// // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎
// // --------------------------

// import {
//   // -----------------------数据定义
//   ref,
//   reactive,
//   toRefs,

//   // -----------------------provide、inject
//   provide,
//   inject,

//   // -----------------------slots、attrs
//   useSlots,
//   useAttrs,

//   // -----------------------watch、watchEffect、computed
//   watch,
//   watchEffect,
//   computed,

//   // -----------------------其他（尽量不要用）
//   getCurrentInstance,

//   // -----------------------生命周期（常用）
//   // 挂载前
//   onBeforeMount,
//   // 挂载后
//   onMounted,
//   // 卸载前
//   onBeforeUnmount
// } from 'vue'

// ------------------------------------------------------------------- data
// // ● Hooks
// // import myHooks from "@/myHooks";
// // const { someData, someMethod } = myHooks();

// // ● vue-router
// // import { useRouter, useRoute } from "vue-router";
// // const router = useRouter();
// // const route = useRoute();
// // let { id } = route.query;
// // router.push({
// //   path: "/detail",
// //   query: { id },
// // });

// ● props
const props = defineProps({
  formOption: {
    type: Object,
    default: () => ({
      form: {},
    }),
  },
});

// // ● emits
// const emits = defineEmits(['xxx'])
// emits('xxx', 'payload')

// // ● slots
// const slots = useSlots()
// console.log(slots.default)

// // ● attrs
// const attrs = useAttrs()
// console.log(attrs)

// // ● ref
// let data1 = ref(100)
// const ruleForm = ref({
//   name: 1
// })
const formRef = ref();

// // ● reactive
// let data2 = reactive({ param1: '', param2: [1] })

// // ● toRefs
// const { param1 } = toRefs(data2)

// // ● computed
// let count = ref(100)
// let double = computed(() => {
//   return count.value * 2
// })
// ------------------------------------------------------------------- methods
function submitForm() {}
// ------------------------------------------------------------------- other
// // ● watch、watchEffect
// let stop = watch(
//   data1,
//   (newVal, oldVal, onInvalidate) => {
//     console.log('123')
//     const timer = setTimeout(() => {
//       console.log('网络请求成功')
//     }, 1000)
//     onInvalidate(() => {
//       // 在监听器的副作用的下一次重新执行前调用
//       clearTimeout(timer)
//     })
//   },
//   // 选项options
//   {
//     deep: true // 深度监视，默认是false
//     // immediate: true,	// 初始化立即执行一次，默认是false
//     // flush: "pre",		// 指定调度器，即何时运行副作用函数。可选值【"pre", "sync", "post"】，默认值"pre"。
//   }
// )
// // stop(); // 停用监听

// watch(data2, () => {
//   console.log('data2，发生变化')
// })
// watch(
//   () => data2.param1,
//   () => {
//     console.log('data2.param1，发生变化')
//   }
// )
// watch(
//   () => data2.param2,
//   () => {
//     console.log('data2.param2，发生变化')
//   },
//   { deep: true }
// )

// // ● 挂载前
// onBeforeMount(() => {
//   console.log('--onBeforeMount')
// })

// // ● 挂载后
// onMounted(() => {
//   console.log('--onMounted')
// })

// // ● 卸载前
// onBeforeUnmount(() => {
//   console.log('--onBeforeUnmount')
// })

// // ● provide
// let title1 = ref('我是全局标题')
// provide('gTitle1', title1)

// // ● inject
// // const title2 = inject("gTitle2");

// // ● defineExpose（暴露到组件外部）
defineExpose({
  // data1
  formRef,
});
</script>

<style lang="scss" src="./index.scss" scoped></style>
