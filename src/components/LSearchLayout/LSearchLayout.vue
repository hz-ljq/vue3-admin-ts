<template>
  <div class="LSearchLayout">
    <el-row :gutter="mergedOptions.common.gutter">
      <template v-for="(item, index) in mergedOptions.items" :key="index">
        <!-- 调用者动态控制显隐： -->
        <!-- 方式1，对插槽使用v-if -->
        <!-- 方式2，设置item的disabled属性 -->
        <el-col v-if="slots[index] && !item.disabled" :span="item.span">
          <div class="item">
            <div
              class="label"
              :style="{
                'min-width': item.labelWidth ?? mergedOptions.common.labelWidth,
                'text-align': item.labelPosition ?? mergedOptions.common.labelPosition
              }"
            >
              <span>{{ item.label }}</span>
              <!-- 为什么用v-html而不用{{}}的原因： -->
              <!-- {{}}：如果labelSuffix的值的前后存在空格的话，空格会无效，即使使用'&nbsp;'来充当空格的作用也无效。 -->
              <!-- v-html：如果labelSuffix的值的前后存在空格的话，空格会无效，但使用'&nbsp;'来充当空格是有效的。 -->
              <span v-html="item.labelSuffix ?? mergedOptions.common.labelSuffix"></span>
            </div>
            <div class="el-comp">
              <slot :name="index"></slot>
            </div>
          </div>
        </el-col>
      </template>

      <el-col v-if="!mergedOptions.btns.disabled" :span="mergedOptions.btns.span">
        <div class="btns" :style="{ 'text-align': mergedOptions.btns.position }">
          <slot name="btns">
            <el-button type="primary" @click="emits('search')">查询</el-button>
            <el-button @click="emits('reset')">重置</el-button>
          </slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="tsx">
import { useSlots } from 'vue'
// ------------------------------------------------------------------- data
// ● props
const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
  }
})

// ● emits
const emits = defineEmits(['search', 'reset'])

// ● slots
const slots = useSlots()
console.log(988, slots[0])

// // ● attrs
// const attrs = useAttrs()
// console.log(attrs)

// 默认配置
const defaultOptions = {
  // ------------------------------ 公共配置
  common: {
    // 标签width，默认值：'auto'
    labelWidth: 'auto',
    // 标签对齐方式，默认值：'right'，可选值：就是text-align的可选值
    labelPosition: 'right',
    // 标签后缀，默认值：'：'
    labelSuffix: '：',
    // 间隔，默认值：20
    gutter: 20
  },
  // ------------------------------ 搜索条件的单项配置（优先级高于【公共配置】）
  items: {
    // 0: {
    //   // 标签文案
    //   label: '条件11',
    //   // 标签布局
    //   labelPosition: 'left',
    //   // 占据的列数
    //   span: 4,
    //   // 显隐flag
    //   disabled: true
    // }
  },
  // ------------------------------ 按钮配置
  btns: {
    // 占据的列数，默认值：4
    span: 4,
    // 对齐方式，默认值：'right'，可选值：就是text-align的可选值
    position: 'right',
    // 显隐flag，默认值：false
    disabled: false
  }
}

// ● computed
// 用户配置（props.options）与组件默认配置（defaultOptions）合并后的配置
const mergedOptions = computed(() => {
  let opt = deepAssign({}, defaultOptions, props.options)
  return opt
})
// ------------------------------------------------------------------- methods
// 判断对象是否是一个纯粹的对象
function isPlainObject(obj) {
  return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]'
}
// 深度合并多个对象的方法
function deepAssign() {
  let len = arguments.length,
    target = arguments[0]
  if (!isPlainObject(target)) {
    target = {}
  }
  for (let i = 1; i < len; i++) {
    let source = arguments[i]
    if (isPlainObject(source)) {
      for (let s in source) {
        if (s === '__proto__' || target === source[s]) {
          continue
        }
        if (isPlainObject(source[s])) {
          target[s] = deepAssign(target[s], source[s])
        } else {
          target[s] = source[s]
        }
      }
    }
  }
  return target
}
// ------------------------------------------------------------------- other
// // ● defineExpose（暴露到组件外部）
// defineExpose({
// })
</script>

<style lang="scss" src="./index.scss" scoped></style>
