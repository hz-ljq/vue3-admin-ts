<template>
  <div class="my">
    <!-- ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 公共组件 -->
    <!-- <LForm ref="LFormRef" :formOption="formOption"></LForm> -->
    <!-- <LSearchLayoutDemo /> -->
    <!-- <LNaviAnchorDemo /> -->
    <!-- <LNaviAnchorTreeDemo /> -->

    <!-- ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 基础代码模板 -->
    <!-- <tmp ref="tmpRef" /> -->

    <!-- <MyTableList ref="MyTableListRef" /> -->
    <MyDialogForm />
    <!-- <JsxComp msg="msg：来自App的prop" @myEmit="myEmit" :listFromParent="[1000, 2000, 3000, 4000]">
      <h3>默认slot</h3>
      <template #foo>
        <h3>具名slot-foo</h3>
      </template>
      <template #listItem="slotProps">
        <div style="color: blue">作用域插槽：{{ slotProps.index }} - {{ slotProps.item }}</div>
      </template>
    </JsxComp> -->
    <!-- <Steps /> -->
    <!-- <MyGaodeMap /> -->
    <!-- <TsDemo /> -->
    <!-- <FormDetail /> -->
  </div>
</template>

<script setup lang="tsx" name="my">
// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 公共hooks
import elFormHook from '@/views/my/MyDialogForm/elFormHook'

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 公共组件
// form封装（太死了，不好搞）
import LForm from '@/components/LForm/LForm.vue'
// 搜索条件的封装
import LSearchLayoutDemo from './LSearchLayoutDemo/index.vue'
// 导航锚点的封装（支持列表）
import LNaviAnchorDemo from './LNaviAnchorDemo/index.vue'
// 导航锚点的封装（支持tree结构）
import LNaviAnchorTreeDemo from './LNaviAnchorTreeDemo/index.vue'

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 基础代码模板
// 临时代码
import tmp from './tmp/index.vue'
// 列表页
import MyTableList from './MyTableList/index.vue'
// 表单页
import MyDialogForm from './MyDialogForm/index.vue'
// 表单详情页
import FormDetail from './FormDetail/index.vue'
// jsx的Demo
import JsxComp from './JsxComp/JsxComp.vue'
// 进度、流程、历史步骤
import Steps from './Steps/Steps.vue'
import MyGaodeMap from './MyGaodeMap/MyGaodeMap.vue'
// TS的Demo
import TsDemo from './TsDemo/index.vue'

// import $ from 'jquery'
// console.log(333, $);
// ------------------------------------------------------------------- data

// ------------------------------------------------------------------- methods
function myEmit(payload: any) {
  console.log('来自JsxComp的事件', payload)
}
// ------------------------------------------------------------------- other
onMounted(() => {})

// todo-ljq
// let { rules } = elFormHook()
//
// const LFormRef = ref()
// const form = ref({
//   input: null,
//   select: 1,
//   radio: 1
// })
// const formOption = ref({
//   form,
//   formParams: {
//     // model: form,
//     rules,
//     labelWidth: '120px'
//   },
//   elRowGutter: '20',
//   itemArr: [
//     {
//       compName: 'el-input',
//       compParams: {
//         placeholder: '请输入'
//       },
//       key: 'input',
//       elFormItemParams: {
//         label: 'el-input',
//         prop: 'input',
//         rules: rules.input
//       },
//       elColSpan: 8
//     },
//     {
//       compName: 'el-select',
//       compParams: {
//         placeholder: '请选择'
//       },
//       key: 'select',
//       elFormItemParams: {
//         label: 'el-select',
//         prop: 'select',
//         rules: rules.singleSelect
//       },
//       elColSpan: 8,
//       options: [
//         {
//           label: 11,
//           value: 1
//         },
//         {
//           label: 22,
//           value: 2
//         },
//         {
//           label: 33,
//           value: 3,
//           disabled: true
//         }
//       ]
//     },
//     {
//       compName: 'el-radio-group',
//       compParams: {
//         placeholder: '请选择'
//       },
//       key: 'radio',
//       elFormItemParams: {
//         label: 'el-radio-group',
//         prop: 'radio',
//         rules: rules.singleSelect
//       },
//       elColSpan: 8,
//       options: [
//         {
//           label: 1,
//           value: '是'
//         },
//         {
//           label: 2,
//           value: '否'
//         }
//       ]
//     }
//   ],
//   btnArr: [
//     {
//       name: '确定',
//       clickHandler: () => {
//         LFormRef.value.formRef.validate((valid, fields) => {
//           if (valid) {
//             console.log('submit!')
//           } else {
//             console.log('error submit!', fields)
//           }
//         })
//       },
//       elButtonType: 'primary'
//     }
//   ]
// })
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: calc(100vh - 140px);
  overflow: auto;
  // color: #40ff00;
  border: 1px solid;
  padding: 20px;
}
</style>
