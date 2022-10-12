<template>
  <div>
    <!-- 默认插槽 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="bar"></slot>
    <!-- 作用域插槽 -->
    <div v-for="(item, index) in myProps.list" :key="index">
      作用域插槽：
      <slot name="listItem" :item="item" :index="index"></slot>
    </div>
  </div>
</template>

<script setup lang="tsx">
let myProps = defineProps({
  list: {
    type: Array
  }
})
</script>
