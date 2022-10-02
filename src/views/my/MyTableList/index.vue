<template>
  <div class="MyTableList">
    <div class="filter">
      <div class="name">应用名称：</div>
      <el-input
        v-model="filter.inputVal"
        placeholder="请输入内容"
        size="small"
      ></el-input>

      <div class="name">状态：</div>
      <el-select v-model="filter.selectVal1" placeholder="请选择" size="small">
        <el-option
          v-for="item in Sel.convertToArray(Sel.opt101)"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
    </div>

    <div class="operation-btns">
      <div class="switch">
        <el-radio v-model="radio" label="1" size="small">我新增的</el-radio>
        <el-radio v-model="radio" label="2" size="small">全部数据</el-radio>
      </div>

      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="openDialog('add')"
        >新增</el-button
      >
    </div>

    <el-table
      ref="multipleTable"
      class="my-table"
      :data="tableData"
      border
      size="small"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      height="100vh"
      max-height="calc(100vh - 300px)"
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <!-- <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          {{
            (paginationOpt.currentPage - 1) * paginationOpt.pageSize +
            scope.$index +
            1
          }}
        </template>
      </el-table-column> -->
      <el-table-column type="index" width="60"> </el-table-column>
      <el-table-column prop="name" label="应用名称" min-width="200">
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="200">
        <template slot-scope="scope">
          <span>{{ Sel.opt101[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="360">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="openDialog('view', scope.row.id)"
            type="text"
            size="small"
          >
            查看
          </el-button>
          <el-button
            @click.native.prevent="openDialog('update', scope.row.id)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            @click.native.prevent="del(scope.row.id)"
            type="text"
            size="small"
          >
            删除
          </el-button>
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
    >
    </el-pagination>

    <!-- 弹出框 -->
    <!-- <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <div v-if="dialog.title !== '查看'" slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.visible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->

    <detailForm
      ref="detailFormDialog"
      :id="detailFormDialogInfo.id"
      :mode="detailFormDialogInfo.mode"
    ></detailForm>
  </div>
</template>

<script>
import * as Api from "./api.js";
import * as Sel from "./selectOpt.js";

export default {
  name: "MyTableList",
  data() {
    return {
      Sel,

      radio: "1",
      filter: {
        inputVal: null,
        selectVal1: null,
      },
      tableData: [],
      loading: false,
      multipleSelection: [],

      paginationOpt: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },

      // 弹出框
      detailFormDialogInfo: {
        mode: "add",
        id: null,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 打开弹出框（新增、查看、编辑）
    openDialog(mode, id) {
      this.detailFormDialogInfo = {
        mode,
        id,
      };

      this.$refs.detailFormDialog.visible = true;
    },

    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Api.del({ id }).then((res) => {
            this.getData1();

            this.$message({
              // showClose: true,
              message: "删除成功！",
              type: "success",
            });
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    getData1() {
      let param = {
        pageNum: this.paginationOpt.currentPage,
        pageSize: this.paginationOpt.pageSize,

        name: this.filter.inputVal,
        status: this.filter.selectVal1,
      };

      this.loading = true;
      Api.getListData(param)
        .then((res) => {
          this.paginationOpt.total = res.result.total;
          this.tableData = res.result.listData;
        })
        .catch(() => {
          this.tableData = [];
          this.paginationOpt.total = 0;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // 查询
    search() {
      this.paginationOpt.currentPage = 1;
      this.getData1();
    },

    // 重置
    reset() {
      this.filter = {
        inputVal: null,
        selectVal1: null,
      };
      this.paginationOpt.currentPage = 1;
      this.getData1();
    },
  },
  created() {
    this.getData1();
  },
  mounted() {
    this.$nextTick(() => {});
  },
  components: {
    detailForm: () =>
      import(/* webpackChunkName: "detailForm" */ "./detailForm"),
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
