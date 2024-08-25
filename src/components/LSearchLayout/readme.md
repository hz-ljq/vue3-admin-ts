#####1，使用方式

```ts
<LSearchLayout :options="searchOptions" @search="search" @reset="reset">
  <template #0>
    <el-input
      v-model="filter.val1"
      placeholder="请输入"
      clearable
    ></el-input>
  </template>
  <template #1>
    <el-date-picker
      v-model="filter.val3"
      type="datetimerange"
      placeholder="请选择"
      clearable
    ></el-date-picker>
  </template>
</LSearchLayout>

import { LSearchLayout } from '@/components/LSearchLayout'

const searchOptions = ref({
  btns: {
    span: 8
    // position: 'right'
  },
  common: {
    // labelWidth: '80px',
    // labelPosition: 'right',
    // labelSuffix: '：',
    // gutter: 20
  },
  items: {
    0: {
      label: '感知源名称',
      span: 8
    },
    1: {
      label: '创建时间',
      span: 8
    },
  }
})
```

#####2，组件参数和事件
看源码...
