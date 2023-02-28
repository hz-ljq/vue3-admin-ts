<template>
  <div class="MyTableList">
    <div class="filter">
      <div class="item">
        <div class="name">应用名称：</div>
        <el-input v-model="filter.inputVal" placeholder="请输入" clearable></el-input>
      </div>

      <div class="item">
        <div class="name">状态：</div>
        <el-select v-model="filter.selectVal1" placeholder="请选择" clearable>
          <el-option
            v-for="item in Sel.convertToArray(Sel.opt101)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div class="item btns">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>

    <div class="operation-btns">
      <div class="switch">
        <el-radio v-model="radio" label="1">我新增的</el-radio>
        <el-radio v-model="radio" label="2">全部数据</el-radio>
      </div>

      <el-button type="primary" icon="Plus" @click="openDialog('add')">新增</el-button>
    </div>

    <el-table
      ref="multipleTable"
      class="my-table"
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      v-loading="loading"
      max-height="calc(100vh - 300px)"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <!-- <el-table-column label="序号" width="60">
        <template #default="scope">
          {{
            (paginationOpt.currentPage - 1) * paginationOpt.pageSize +
            scope.$index +
            1
          }}
        </template>
      </el-table-column> -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="val1" label="应用名称" min-width="200"></el-table-column>
      <el-table-column prop="val2" label="状态" min-width="200">
        <template #default="scope">
          <span>{{ Sel.opt101.get(scope.row.val2) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button @click="openDialog('view', scope.row.id)" type="primary" link>查看</el-button>
          <el-button @click="openDialog('update', scope.row.id)" type="primary" link>编辑</el-button>
          <el-button @click="del(scope.row.id)" type="primary" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="my-pagination">
      <el-pagination
        v-model:currentPage="paginationOpt.currentPage"
        v-model:page-size="paginationOpt.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationOpt.total"
      ></el-pagination>
    </div>

    <!-- 弹出框 -->
    <!-- <el-dialog :title="dialog.title" v-model="dialog.visible">
      <div v-if="dialog.title !== '查看'" slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.visible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->

    <detailForm ref="detailFormDialog" :id="detailFormDialogInfo.id" :mode="detailFormDialogInfo.mode" />
  </div>
</template>

<script setup lang="ts" name="MyTableList">
import * as Api from './api'
import * as Sel from './selectOpt'
import { ElMessage, ElMessageBox } from 'element-plus'
import detailForm from './detailForm/index.vue'

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
const radio = ref('1')
const filter = reactive({
  inputVal: null,
  selectVal1: null
})
const tableData = ref([])
const loading = ref(false)
const multipleSelection = ref([])

const paginationOpt = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 弹出框
const detailFormDialogInfo = ref({
  mode: 'add',
  id: null
})

const detailFormDialog = ref()

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ methods
// 打开弹出框（新增、查看、编辑）
function openDialog(mode, id) {
  detailFormDialogInfo.value = {
    mode,
    id
  }

  detailFormDialog.value.visible = true
}

// 删除
function del(id) {
  ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      Api.del({ id }).then((res) => {
        getData1()

        ElMessage({
          // showClose: true,
          message: '删除成功！',
          type: 'success'
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}

function handleSelectionChange(val) {
  multipleSelection.value = val
}

// 获取 列表数据
function getData1() {
  let param = {
    pageNum: paginationOpt.currentPage,
    pageSize: paginationOpt.pageSize,

    val1: filter.inputVal,
    val2: filter.selectVal1
  }

  loading.value = true
  Api.getListData(param)
    .then((res) => {
      paginationOpt.total = res.result.total
      tableData.value = res.result.listData
    })
    .catch(() => {
      tableData.value = []
      paginationOpt.total = 0
    })
    .finally(() => {
      loading.value = false
    })
}

// 查询
function search() {
  paginationOpt.currentPage = 1
  getData1()
}

// 重置
function reset() {
  filter.inputVal = null
  filter.selectVal1 = null
  paginationOpt.currentPage = 1
  getData1()
}

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ other
watch(() => paginationOpt.currentPage, getData1)
watch(() => paginationOpt.pageSize, getData1)

onBeforeMount(() => {
  getData1()
})
</script>

<style lang="scss" src="./index.scss" scoped></style>
