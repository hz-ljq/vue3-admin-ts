<template>
  <div class="Steps">
    <div v-for="item in flowList" :key="item.title" class="item">
      <el-icon class="icon" :class="item.status">
        <SuccessFilled v-if="['waiting', 'done'].includes(item.status)" />
        <WarningFilled v-else-if="['todo'].includes(item.status)" />
        <CircleCloseFilled v-else-if="['reject'].includes(item.status)" />
      </el-icon>

      <div class="step-content">
        <div class="title">{{ item.title }}</div>
        <div class="desc">
          {{ item.desc }}
          <span style="color: #409eff">{{ item.statusText }}</span>
        </div>
        <div v-if="item.reason" class="desc">{{ item.reason }}</div>
        <div v-if="item.time" class="time">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Steps">
const flowList = ref([
  {
    status: 'done',
    statusText: '已完成（状态文案）',
    title: '申请（节点名称）',
    desc: '描述/备注。。。',
    reason: '理由。。。',
    time: '2023-01-01 08:00:01'
  },
  {
    status: 'todo',
    statusText: '待处理（状态文案）',
    title: '初审（节点名称）',
    desc: '描述/备注。。。',
    reason: '理由。。。',
    time: '2023-01-01 08:00:02'
  },
  {
    status: 'waiting',
    statusText: '等待中（状态文案）',
    title: '复审（节点名称）',
    desc: '描述/备注。。。',
    reason: '理由。。。',
    time: '2023-01-01 08:00:03'
  },
  {
    status: 'reject',
    statusText: '已拒绝（状态文案）',
    title: '交办（节点名称）',
    desc: '描述/备注。。。',
    reason: '理由。。。',
    time: '2023-01-01 08:00:04'
  }
])
</script>

<style lang="scss" src="./index.scss" scoped></style>
