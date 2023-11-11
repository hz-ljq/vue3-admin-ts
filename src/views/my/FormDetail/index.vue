<template>
  <div class="FormDetail">
    <!-- ■■■■■■■■■■■■ 信息一 ■■■■■■■■■■■■ -->
    <div class="title">信息一</div>
    <div class="wrapper">
      <div v-for="item in detailInfo.info1" :key="item.label" class="item" :style="{ width: item.width ?? '50%' }">
        <div class="label">{{ item.label }}</div>
        <div class="value">
          <!-- tags -->
          <template v-if="item.label === '关键字'">
            <el-tag v-for="subItem in item.value" :key="subItem" style="margin-right: 10px">
              {{ subItem }}
            </el-tag>
          </template>

          <!-- 预览 -->
          <el-button v-else-if="item.label === '图片' && item.url" type="primary" link @click="previewFile(item.url)">
            点击预览
          </el-button>

          <!-- 下载 -->
          <el-button
            v-else-if="item.label === '文档' && item.url"
            type="primary"
            link
            @click="downloadFile({ name: item.name, url: item.url })"
          >
            点击下载
          </el-button>

          <!-- 普通文字 -->
          <span v-else>{{ item.value }}</span>
        </div>
      </div>
    </div>

    <!-- ■■■■■■■■■■■■ 信息二 ■■■■■■■■■■■■ -->
    <div class="title">信息二</div>
    <el-table :data="detailInfo.info2">
      <el-table-column prop="name" label="所属单位" min-width="100" />
      <el-table-column prop="contractName" label="联系人" />
      <el-table-column prop="contractPhone" label="联系方式" />
      <el-table-column prop="contractPost" label="联系人岗位" />
    </el-table>
  </div>
</template>

<script setup lang="tsx">
import elFormHook from '@/views/my/MyDialogForm/elFormHook';
const { previewFile, downloadFile } = elFormHook();

// 详情信息
const detailInfo = reactive<any>({
  info1: [
    {
      label: '数字',
      value: '81938938439840',
    },
    {
      label: '资源类型',
      value: '资源类型',
    },
    {
      label: '敏感等级',
      value:
        '网页防篡改、web应用防火墙、数据库审计、运维审计、日志审计网页防篡改、web应用防火墙、数据库审计、运维审计、日志审计网页防篡改、web应用防火墙、数据库审计、运维审计、日志审计网页防篡改、web应用防火墙、数据库审计、运维审计、日志审计',
      width: '100%',
    },
    {
      label: '关键字',
      value: ['tag-1', 'tag-2', 'tag-3'],
      width: '100%',
    },
    {
      label: '图片',
      url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    },
    {
      label: '文档',
      name: '文档名称.jpg',
      url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    },
  ],

  info2: [
    {
      name: 'xxx',
      contractName: 'xxx',
      contractPhone: 'xxx',
      contractPost: 'xxx',
    },
    {
      name: 'xxx',
      contractName: 'xxx',
      contractPhone: 'xxx',
      contractPost: 'xxx',
    },
  ],
});
</script>

<style lang="scss" src="./index.scss" scoped></style>
