<template>
  <div class="MyTableList">
    <div class="filter">
      <div class="name">应用名称：</div>
      <el-input v-model="filter.inputVal" placeholder="请输入内容"></el-input>

      <div class="name">状态：</div>
      <el-select v-model="filter.selectVal1" placeholder="请选择">
        <el-option
          v-for="item in Sel.convertToArray(Sel.opt101)"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </div>

    <div class="operation-btns">
      <div class="switch">
        <el-radio v-model="radio" label="1" >我新增的</el-radio>
        <el-radio v-model="radio" label="2" >全部数据</el-radio>
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
      height="100vh"
      max-height="calc(100vh - 300px)"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <!-- <el-table-column label="序号" width="60">
        <template #default="scope">
          {{
            (paginationOpt.currentPage - 1) * paginationOpt.pageSize +
            scope.$index +
            1
          }}
        </template>
      </el-table-column> -->
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="应用名称" min-width="200"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="200">
        <template #default="scope">
          <span>{{ Sel.opt101[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="360">
        <template #default="scope">
          <el-button @click.native.prevent="openDialog('view', scope.row.id)" type="primary" link>查看</el-button>
          <el-button @click.native.prevent="openDialog('update', scope.row.id)" type="primary" link>
            编辑
          </el-button>
          <el-button @click.native.prevent="del(scope.row.id)" type="primary" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="my-pagination"
      :current-page.sync="paginationOpt.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="paginationOpt.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationOpt.total"
      @size-change="getData1"
      @current-change="getData1"
    ></el-pagination>

    <!-- 弹出框 -->
    <!-- <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <div v-if="dialog.title !== '查看'" slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.visible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->

    <!-- <detailForm ref="detailFormDialog" :id="detailFormDialogInfo.id" :mode="detailFormDialogInfo.mode"></detailForm> -->
  </div>
</template>

<script setup lang="ts">
import * as Api from './api.js'
import * as Sel from './selectOpt.js'
// import detailForm from './detailForm/index.vue'

import {
  // -----------------------数据定义
  ref,
  reactive,
  toRefs,

  // -----------------------provide、inject
  provide,
  inject,

  // -----------------------slots、attrs
  useSlots,
  useAttrs,

  // -----------------------watch、watchEffect、computed
  watch,
  watchEffect,
  computed,

  // -----------------------其他
  getCurrentInstance,

  // -----------------------生命周期（常用）
  // 挂载前
  onBeforeMount,
  // 挂载后
  onMounted,
  // 卸载前
  onBeforeUnmount
} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

let radio = ref('1')
let filter = reactive({
  inputVal: null,
  selectVal1: null
})
let tableData = ref([])
let loading = ref(false)
let multipleSelection = ref([])

let paginationOpt = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 弹出框
let detailFormDialogInfo = reactive({
  mode: 'add',
  id: null
})







// 打开弹出框（新增、查看、编辑）
function openDialog(mode, id) {
  detailFormDialogInfo = {
    mode,
    id,
  };

  // this.$refs.detailFormDialog.visible = true;
}

function del(id) {
  ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      Api.del({ id }).then((res) => {
        getData1();

        ElMessage({
          // showClose: true,
          message: "删除成功！",
          type: "success",
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
}

function handleSelectionChange(val) {
  multipleSelection.value = val;
}

function getData1() {
  let param = {
    pageNum: paginationOpt.currentPage,
    pageSize: paginationOpt.pageSize,

    name: filter.inputVal,
    status: filter.selectVal1,
  };

  loading.value = true;
  Api.getListData(param)
    .then((res) => {
      console.log(333)
      paginationOpt.total = res.result.total;
      tableData.value = res.result.listData;
    })
    .catch(() => {
      tableData.value = [];
      paginationOpt.total = 0;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 查询
function search() {
  paginationOpt.currentPage = 1;
  getData1();
}

// 重置
function reset() {
  filter.inputVal = null;
  filter.selectVal1 = null;
  paginationOpt.currentPage = 1;
  getData1();
}





getData1();



// -------------------------------------------------------------------slots、attrs
const slots = useSlots()
console.log(slots.default)
const attrs = useAttrs()
console.log(attrs)
// -------------------------------------------------------------------数据定义
// ref
let data1 = ref(100)
// reactive
let data2 = reactive({ param1: '', param2: [1] })
// toRefs
const { param1 } = toRefs(data2)
// --------------------------------------------------------------------computed
let count = ref(100)
let double = computed(() => {
  return count * 2
})
// --------------------------------------------------------------------watch、watchEffect
let stop = watch(
  data1,
  (newVal, oldVal, onInvalidate) => {
    console.log('123')
    const timer = setTimeout(() => {
      console.log('网络请求成功')
    }, 1000)
    onInvalidate(() => {
      // 在监听器的副作用的下一次重新执行前调用
      clearTimeout(timer)
    })
  },
  // 选项options
  {
    deep: true // 深度监视，默认是false
    // immediate: true,	// 初始化立即执行一次，默认是false
    // flush: "pre",		// 指定调度器，即何时运行副作用函数。可选值【"pre", "sync", "post"】，默认值"pre"。
  }
)
// stop(); // 停用监听

watch(data2, () => {
  console.log('data2，发生变化')
})
watch(
  () => data2.param1,
  () => {
    console.log('data2.param1，发生变化')
  }
)
watch(
  () => data2.param2,
  () => {
    console.log('data2.param2，发生变化')
  },
  { deep: true }
)

// -------------------------------------------------------------------provide、inject
// provide
let title1 = ref('我是全局标题')
provide('$gTitle1', title1)
// inject
// const title2 = inject("$gTitle2");
// -------------------------------------------------------------------Hooks
// import myHooks from "@/myHooks";
// const { someData, someMethod } = myHooks();
// -------------------------------------------------------------------vue-router
// import { useRouter, useRoute } from "vue-router";
// const router = useRouter();
// const route = useRoute();
// let { id } = route.query;
// router.push({
//   path: "/detail",
//   query: { id },
// });
// -------------------------------------------------------------------props、emits
// props
const props = defineProps({
  prop1: {
    type: String,
    default: '设置默认值'
  }
})
// emits
const emits = defineEmits(['xxx'])
emits('xxx', 'payload')

// -------------------------------------------------------------------生命周期
// 挂载前
onBeforeMount(() => {
  console.log('--onBeforeMount')
})
// 挂载后
onMounted(() => {
  console.log('--onMounted')
})
// 卸载前
onBeforeUnmount(() => {
  console.log('--onBeforeUnmount')
})
// -------------------------------------------------------------------暴露到组件外部
defineExpose({
  data1
})
</script>

<style lang="scss" src="./index.scss" scoped></style>
