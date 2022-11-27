<template>
  <div class="my">
    <!-- <tmp /> -->
    <!-- <MyTableList /> -->
    <!-- <MyDialogForm /> -->
    <!-- <JsxComp msg="msg：来自App的prop" @myEmit="myEmit" :listFromParent="[1000, 2000, 3000, 4000]">
      <h3>默认slot</h3>
      <template #foo>
        <h3>具名slot-foo</h3>
      </template>
      <template #listItem="slotProps">
        <div style="color: blue">作用域插槽：{{ slotProps.index }} - {{ slotProps.item }}</div>
      </template>
    </JsxComp> -->
    <LForm ref="LFormRef" :formOption="formOption"></LForm>
  </div>
</template>

<script setup lang="tsx" name="my">
import tmp from './tmp/index.vue'
import MyTableList from './MyTableList/index.vue'
import MyDialogForm from './MyDialogForm/index.vue'
import JsxComp from './JsxComp/JsxComp.vue'
import LForm from '@/components/LForm/LForm.vue'
import elFormHook from '@/views/my/MyDialogForm/elFormHook'

function myEmit(payload: any) {
  console.log('来自JsxComp的事件', payload)
}

// todo-ljq
let { rules } = elFormHook()

const LFormRef = ref()
const form = ref({
  input: null,
  select: 1,
  radio: 1
})
const formOption = ref({
  form,
  formParams: {
    // model: form,
    rules,
    labelWidth: '120px'
  },
  elRowGutter: '20',
  itemArr: [
    {
      compName: 'el-input',
      compParams: {
        placeholder: '请输入'
      },
      key: 'input',
      elFormItemParams: {
        label: 'el-input',
        prop: 'input',
        rules: rules.input
      },
      elColSpan: 8
    },
    {
      compName: 'el-select',
      compParams: {
        placeholder: '请选择'
      },
      key: 'select',
      elFormItemParams: {
        label: 'el-select',
        prop: 'select',
        rules: rules.singleSelect
      },
      elColSpan: 8,
      options: [
        {
          label: 11,
          value: 1
        },
        {
          label: 22,
          value: 2
        },
        {
          label: 33,
          value: 3,
          disabled: true
        }
      ]
    },
    {
      compName: 'el-radio-group',
      compParams: {
        placeholder: '请选择'
      },
      key: 'radio',
      elFormItemParams: {
        label: 'el-radio-group',
        prop: 'radio',
        rules: rules.singleSelect
      },
      elColSpan: 8,
      options: [
        {
          label: 1,
          value: '是'
        },
        {
          label: 2,
          value: '否'
        }
      ]
    }
  ],
  btnArr: [
    {
      name: '确定',
      clickHandler: () => {
        LFormRef.value.formRef.validate((valid, fields) => {
          if (valid) {
            console.log('submit!')
          } else {
            console.log('error submit!', fields)
          }
        })
      },
      elButtonType: 'primary'
    }
  ]
})
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: calc(100vh - 140px);
  overflow: auto;
}
</style>
