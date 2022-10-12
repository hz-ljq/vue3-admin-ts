<template>
  <div class="my">
    <!-- <tmp /> -->
    <!-- <MyTableList /> -->
    <!-- <MyDialogForm /> -->
    <JsxComp msg="msg：来自App的prop" @myEmit="myEmit">
      <h3>默认slot</h3>
      <template #foo>
        <h3>具名slot-foo</h3>
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
