<template>
  <div class="my">
    <!-- <tmp /> -->
    <!-- <MyTableList /> -->
    <!-- <MyDialogForm /> -->
    <JsxComp msg="msg：来自App的prop" @myEmit="myEmit" :listFromParent="[1000, 2000, 3000, 4000]">
      <!-- 默认插槽 -->
      <h3>默认slot</h3>
      <!-- 具名插槽 -->
      <template #foo>
        <h3>具名slot-foo</h3>
      </template>
      <!-- 作用域插槽 -->
      <template #listItem="slotProps">
        <div style="color: blue">作用域插槽：{{ slotProps.index }} - {{ slotProps.item }}</div>
      </template>
    </JsxComp>
  </div>
</template>

<script setup lang="ts" name="my">
import tmp from './tmp/index.vue'
import MyTableList from './MyTableList/index.vue'
import MyDialogForm from './MyDialogForm/index.vue'
import JsxComp from './JsxComp/JsxComp.vue'

function myEmit(payload: any) {
  console.log('来自JsxComp的事件', payload)
}
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: calc(100vh - 140px);
  overflow: auto;
}
</style>
