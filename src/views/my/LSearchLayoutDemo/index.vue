<template>
  <LSearchLayout :options="options" @search="search" @reset="reset">
    <template #0>
      <el-input v-model="filter.val0" placeholder="输入后，条件1会隐藏"></el-input>
    </template>
    <template v-if="!filter.val0" #1>
      <el-select v-model="filter.val1" placeholder="请选择" clearable>
        <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </template>
    <template #2>
      <el-input v-model="filter.val2" placeholder="请输入"></el-input>
    </template>
    <template #3>
      <el-input v-model="filter.val3" placeholder="请输入"></el-input>
    </template>
    <template #4>
      <el-date-picker
        v-model="filter.val4"
        type="date"
        placeholder="选择后，条件3会隐藏"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      ></el-date-picker>
    </template>

    <!-- 可不写，因为按钮slot有默认值 -->
    <!-- <template #btns>
      <el-button type="primary" @click="search">查询1</el-button>
      <el-button type="primary" @click="reset">重置1</el-button>
    </template> -->
  </LSearchLayout>
</template>

<script setup lang="tsx">
import LSearchLayout from '@/components/LSearchLayout/LSearchLayout.vue'
// ------------------------------------------------------------------- data
const options = ref({
  btns: {
    // disabled: true,
    span: 8
    // position: 'right'
  },
  common: {
    // labelWidth: '160px',
    // labelPosition: 'right',
    // labelSuffix: '：',
    // gutter: 20
  },
  items: {
    0: {
      label: '条件0',
      labelPosition: 'left',
      labelWidth: '60px',
      span: 4
    },
    1: {
      label: '条件1',
      labelWidth: '80px',
      span: 4
    },
    2: {
      label: '条件2',
      labelWidth: '100px',
      span: 10
    },
    3: {
      label: '条件3',
      labelPosition: 'left',
      labelWidth: '120px',
      span: 8
      // disabled: true
    },
    4: {
      label: '条件4',
      labelWidth: '140px',
      span: 8
    }
  }
})

const filter = ref({
  val0: null,
  val1: null,
  val2: null,
  val3: null,
  val4: null
})

const opt = [
  {
    label: 1,
    value: 1
  },
  {
    label: 2,
    value: 2
  }
]
// ------------------------------------------------------------------- methods
function search() {
  console.log('search', filter.value)
}
function reset() {
  console.log('reset', filter.value)
}
// ------------------------------------------------------------------- other
watch(
  () => filter.value.val4,
  () => {
    options.value.items[3].disabled = !!filter.value.val4
  }
)
</script>

<style lang="scss" src="./index.scss" scoped></style>
