<template>
  <div class="detailForm">
    <el-dialog
      class="my-dialog"
      title="我是标题（弹出框）"
      :visible.sync="visible"
      @open="open"
      @close="close"
    >
      <el-form
        class="my-form"
        :model="form"
        ref="ruleForm"
        label-width="180px"
        size="small"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="应用名称" prop="val1" required>
              <el-input
                v-model="form.val1"
                autocomplete="off"
                placeholder="请输入"
                clearable
                :disabled="mode === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="状态" prop="val2" required>
              <el-select
                v-model="form.val2"
                placeholder="请选择"
                filterable
                clearable
                :disabled="mode === 'view'"
              >
                <el-option
                  v-for="item in Sel.convertToArray(Sel.opt101)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- form按钮 -->
        <!-- <el-form-item>
          <el-button
            style="float: right; margin-left: 10px"
            type="primary"
            @click="submit"
            :loading="submitLoading"
            size="small"
            >{{ submitLoading ? "正在提交..." : "提交" }}</el-button
          >
          <el-button
            style="float: right; margin-left: 10px"
            @click="visible = false"
            >取消</el-button
          >
        </el-form-item> -->
      </el-form>

      <!-- dialog按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="submitLoading"
          @click="submit"
          >{{ submitLoading ? "正在提交..." : "提交" }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as Sel from "../selectOpt";
import * as Api from "../api.js";
import elFormMixin from "./elFormMixin.js";

export default {
  name: "detailForm",
  mixins: [elFormMixin],
  props: {
    id: {
      type: [String, Number],
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      Sel,
      visible: false,
      form: null,
      submitLoading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    getDetail() {
      return new Promise((resolve) => {
        let res = {
          result: {
            val1: 1,
            val2: 1,
          },
        };
        resolve(res);
      });
    },
    // 提交
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          Api.submit()
            .then(() => {
              this.visible = false;
              this.$message({
                // showClose: true,
                message: "提交成功！",
                type: "success",
              });
              this.$emit("submited");
            })
            .catch((err) => {})
            .finally(() => {
              this.submitLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    init() {
      // 初始化表单
      this.form = {
        val1: null,
        val2: null,
      };

      // 清除校验
      this.$nextTick(() => {
        this.$refs.ruleForm?.clearValidate();
      });
    },

    open() {
      this.$nextTick(() => {
        if (this.mode !== "add" && this.id !== null) {
          let param = { id: this.id };
          this.getDetail(param).then((res) => {
            this.form = res.result;
            this.$refs.ruleForm?.validate().catch((err) => false);
          });
        }
      });
    },
    close() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  mounted() {
    this.$nextTick(() => {});
  },
  components: {},
  beforeDestroy() {},
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
