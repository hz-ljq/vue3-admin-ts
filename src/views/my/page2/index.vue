<template>
  <div>
    <el-popover v-model:visible="visible" placement="top" :width="160" trigger="click">
      <p>Are you sure to delete this?</p>
      <div style="text-align: right; margin: 0">
        <el-button size="small" text @click="visible = false">cancel</el-button>
        <el-button size="small" type="primary" @click="visible = false">confirm</el-button>
      </div>
      <template #reference>
        <el-button>Delete</el-button>
      </template>
    </el-popover>

    <el-button :plain="true" @click="open">Show message</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const visible = ref(false)

const open = () => {
  ElMessage('this is a message.')
}
</script>
