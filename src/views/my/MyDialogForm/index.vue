<template>
  <div class="MyDialogForm">
    <el-dialog class="my-dialog" title="我是标题（弹出框）" :visible.sync="visible" @open="open" @close="close">
      <el-form class="my-form" :model="form" :rules="rules" ref="ruleForm" label-width="180px" size="small">
        <div
          @click="setFormData"
          style="position: absolute; right: 80px; top: 20px; color: red; font-size: 20px; cursor: pointer"
        >
          一键填充
        </div>
        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ （异步校验）类型 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-row>
          <el-col :span="24">
            <el-divider>（异步校验）类型</el-divider>
          </el-col>
          <el-col :span="8">
            <el-form-item label="字符串输入框(单行)" prop="name" :rules="rules.asyncName">
              <el-input
                v-model="form.name"
                autocomplete="off"
                placeholder="请输入"
                clearable
                :disabled="mode === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ （输入）类型 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-row>
          <el-col :span="24">
            <el-divider>（输入）类型</el-divider>
          </el-col>
          <el-col :span="8">
            <el-form-item label="字符串输入框(单行)" prop="val1" :rules="rules.input">
              <el-input
                v-model="form.val1"
                autocomplete="off"
                placeholder="请输入"
                clearable
                :disabled="mode === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数字输入框" prop="val2" :rules="rules.inputNumber">
              <el-input-number
                v-model="form.val2"
                controls-position="right"
                :min="0"
                :precision="4"
                :step="1"
                autocomplete="off"
                :disabled="mode === 'view'"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="字符串输入框(多行)" prop="val3" :rules="rules.input">
              <el-input
                type="textarea"
                :rows="1"
                v-model="form.val3"
                autocomplete="off"
                placeholder="请输入"
                :disabled="mode === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ （选择）类型 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-row>
          <el-col :span="24">
            <el-divider>（选择）类型</el-divider>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下拉框(单选)" prop="val4" :rules="rules.singleSelect">
              <el-select v-model="form.val4" placeholder="请选择" filterable clearable :disabled="mode === 'view'">
                <el-option
                  v-for="item in selectOpt.convertToArray(selectOpt.opt101)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下拉框(多选)" prop="val5" :rules="rules.multipleSelect">
              <el-select
                v-model="form.val5"
                placeholder="请选择"
                filterable
                multiple
                clearable
                :disabled="mode === 'view'"
              >
                <el-option
                  v-for="item in selectOpt.convertToArray(selectOpt.opt101)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="级联选择器(单选)" prop="val6" :rules="rules.singleSelect">
              <el-cascader
                v-model="form.val6"
                placeholder="请选择"
                :options="treeData"
                :props="cascaderProps"
                filterable
                :disabled="mode === 'view'"
              ></el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="时间选择器" prop="val7" :rules="rules.singleSelect">
              <el-date-picker
                v-model="form.val7"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="mode === 'view'"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="radio" prop="val8" :rules="rules.singleSelect">
              <el-radio-group v-model="form.val8" :disabled="mode === 'view'">
                <el-radio
                  v-for="item in selectOpt.convertToArray(selectOpt.opt101)"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="switch" prop="val9" :rules="rules.singleSelect">
              <el-switch v-model="form.val9" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="checkbox" prop="val10" :rules="rules.multipleSelect">
              <el-checkbox-group v-model="form.val10" :disabled="mode === 'view'">
                <el-checkbox
                  :label="item.value"
                  v-for="item in selectOpt.convertToArray(selectOpt.opt101)"
                  :key="item.value"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ （复杂）类型 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-row>
          <el-col :span="24">
            <el-divider>（复杂）类型</el-divider>
          </el-col>

          <el-col :span="24">
            <el-form-item label="表格" prop="tableList" :rules="rules.multipleTableRow">
              <el-table border size="small" :data="form.tableList" style="width: 100%" max-height="300">
                <el-table-column label="姓名" min-width="300px">
                  <template slot-scope="scope">
                    <el-form-item :prop="`tableList.${scope.$index}.name`" :rules="rules.input" :show-message="false">
                      <el-input
                        v-model="scope.row.name"
                        autocomplete="off"
                        placeholder="请输入"
                        clearable
                        :disabled="mode === 'view'"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="文件上传" prop="files">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`tableList.${scope.$index}.files`"
                      :rules="rules.multipleUpload"
                      :inline-message="true"
                    >
                      <el-upload
                        :action="actionUrl"
                        :headers="uploadHeaders"
                        :data="uploadParam"
                        name="multipartFile"
                        :file-list="scope.row.files"
                        :on-success="
                          uploadOnSuccess.bind(null, {
                            obj: scope.row,
                            key: 'files',
                            propName: `tableList.${scope.$index}.files`
                          })
                        "
                        :before-upload="beforeUpload.bind(null, 13)"
                        :on-remove="
                          uploadHandleRemove.bind(null, {
                            obj: scope.row,
                            key: 'files',
                            propName: `tableList.${scope.$index}.files`
                          })
                        "
                        :on-preview="handlePreview"
                        :limit="10"
                        :disabled="mode === 'view'"
                      >
                        <el-button size="small" type="primary" plain icon="el-icon-upload2" :disabled="mode === 'view'">
                          点击上传
                        </el-button>
                        <div slot="tip" class="el-upload__tip">（单文件限256MB）</div>
                      </el-upload>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="80">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="delTableRow('表格', scope.$index)"
                      type="text"
                      size="small"
                      :disabled="mode === 'view'"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="add-btn">
                <el-button
                  type="text"
                  icon="el-icon-plus"
                  @click.native.prevent="addTableRow('表格')"
                  :disabled="mode === 'view'"
                >
                  新增
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- form按钮 -->
        <el-form-item>
          <el-button
            style="float: right; margin-left: 10px"
            type="primary"
            @click="submit"
            :loading="submitLoading"
            size="small"
          >
            {{ submitLoading ? '正在提交...' : '提交' }}
          </el-button>
          <el-button style="float: right; margin-left: 10px" @click="visible = false">取消</el-button>
        </el-form-item>
      </el-form>

      <el-form
        class="my-form"
        :model="form2"
        :rules="rules"
        ref="ruleForm2"
        label-suffix="："
        label-width="240px"
        size="small"
      >
        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 步骤 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-steps :active="stepsActive" finish-status="success">
          <el-step title="第0步"></el-step>
          <el-step title="第1步"></el-step>
          <el-step title="第2步"></el-step>
        </el-steps>
        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️ 第0步 ◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-row v-if="stepsActive === 0">
          <el-col :span="24">
            <el-divider>第0步</el-divider>
          </el-col>

          <el-col :span="8">
            <el-form-item label="输入框0" prop="stepInfo.val100" :rules="rules.input">
              <el-input
                v-model="form2.stepInfo.val100"
                autocomplete="off"
                placeholder="请输入"
                clearable
                :disabled="mode === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️ 第1步 ◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-row v-if="stepsActive === 1">
          <el-col :span="24">
            <el-divider>第1步</el-divider>
          </el-col>
          <el-col :span="8">
            <el-form-item label="输入框1" prop="stepInfo.val101" :rules="rules.input">
              <el-input
                v-model="form2.stepInfo.val101"
                autocomplete="off"
                placeholder="请输入"
                clearable
                :disabled="mode === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️ 第2步 ◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-row v-if="stepsActive === 2">
          <el-col :span="24">
            <el-divider>第2步</el-divider>
          </el-col>
          <el-col :span="8">
            <el-form-item label="输入框2" prop="stepInfo.val102" :rules="rules.input">
              <el-input
                v-model="form2.stepInfo.val102"
                autocomplete="off"
                placeholder="请输入"
                clearable
                :disabled="mode === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- dialog按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取消</el-button>

        <template v-if="stepsActive === 0">
          <el-button type="primary" size="small" @click="stepPlus">下一步</el-button>
        </template>

        <template v-if="stepsActive === 1">
          <el-button size="small" @click="stepMinus">上一步</el-button>
          <el-button type="primary" size="small" @click="stepPlus">下一步</el-button>
        </template>

        <template v-if="stepsActive === 2">
          <el-button size="small" @click="stepMinus">上一步</el-button>
          <el-button type="primary" size="small" @click="stepPlus">提交</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as selectOpt from './selectOpt'
import * as Api from './api.js'
import elFormMixin from './elFormMixin.js'

export default {
  name: 'MyDialogForm',
  mixins: [elFormMixin],
  props: {
    mode: {
      type: String,
      default: () => {
        return 'add' // ["view", "add", "update"]
      }
    }
  },
  data() {
    // 异步校验
    let asyncName = async (rule, value, callback) => {
      let prom = (name) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (name === '123') {
              resolve({
                result: false
              })
            } else {
              resolve({
                result: true
              })
            }
          }, 200)
        })
      }

      if (!value) {
        callback(new Error('请输入'))
      } else {
        let res = await prom(value)
        if (res.result) {
          callback()
        } else {
          callback(new Error('该名称已存在，请重新输入。'))
        }
      }
    }

    return {
      treeData: [],
      cascaderProps: {
        expandTrigger: 'hover',
        emitPath: false,
        checkStrictly: true
      },

      selectOpt,
      visible: false,
      form: null,
      form2: null,
      rules: {
        name: [
          {
            required: true,
            // message: "请输入",
            validator: asyncName,
            trigger: ['blur', 'change'],
            transform: this.validateHook
          }
        ]
      },
      submitLoading: false,

      stepsActive: 0 // 当前步骤
    }
  },
  computed: {},
  watch: {
    // 当前步骤
    stepsActive(newVal) {}
  },
  methods: {
    // 一键填充
    setFormData() {
      this.form = {
        name: '1232',
        val1: '1',
        val2: 0,
        val3: '1',
        val4: 1,
        val5: [1],
        val6: 'zhinan',
        val7: '2022-06-07 00:00:00',
        val8: 1,
        val9: 1,
        val10: [1],
        tableList: [
          {
            name: '1',
            files: [
              {
                name: '5.png',
                fileName: 'doc/199be6db30794180a9b8d2874f1b9b25.png'
              }
            ]
          }
        ]
      }

      this.$nextTick(() => {
        this.$refs.ruleForm.validate().catch((err) => false)
      })
    },
    // 新增一行
    addTableRow(tableOf) {
      if (tableOf === '表格') {
        this.form.tableList.push({
          name: null,
          files: []
        })
      }

      // 不加$nextTick的话，只会校验新增行之前的行；
      this.$nextTick(() => {
        this.$refs.ruleForm.validate().catch((err) => false)
      })
    },

    // 删除一行
    delTableRow(tableOf, index) {
      if (tableOf === '表格') {
        this.form.tableList.splice(index, 1)
      }

      // 不加$nextTick的话，校验会报错："Error: please transfer a valid prop path to form item!"；
      this.$nextTick(() => {
        this.$refs.ruleForm.validate().catch((err) => false)
      })
    },
    // 校验钩子
    validateHook(value) {
      // do something
      return value
    },
    // 上一步
    stepMinus() {
      this.stepsActive--
    },
    // 下一步
    stepPlus() {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          if (this.stepsActive === 2) {
            this.submitLoading = true
            Api.submit()
              .then(() => {
                this.stepsActive = 0
                this.$message({
                  // showClose: true,
                  message: '提交成功！',
                  type: 'success'
                })
              })
              .catch((err) => {})
              .finally(() => {
                this.submitLoading = false
              })
          } else {
            this.stepsActive++
          }
        }
      })
    },
    // 提交
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          Api.submit()
            .then(() => {
              this.$message({
                // showClose: true,
                message: '提交成功！',
                type: 'success'
              })
            })
            .catch((err) => {})
            .finally(() => {
              this.submitLoading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    init() {
      // 初始化表单
      this.form = {
        // （异步校验）类型
        name: '123',
        // （输入）类型
        val1: null,
        val2: null,
        val3: null,
        // （选择）类型
        val4: null,
        val5: [],
        val6: null,
        val7: null,
        val8: 1,
        val9: 1,
        val10: [],
        // （复杂）类型
        tableList: [
          // {
          //   name: null,
          //   files: [],
          // },
        ]
      }

      // 初始化表单
      this.form2 = {
        stepInfo: {
          val100: null, // 第0步
          val101: null, // 第1步
          val102: null // 第2步
        }
      }

      // 重置当前步骤
      this.stepsActive = 0
      // 清除校验
      this.$nextTick(() => {
        this.$refs.ruleForm?.clearValidate()
      })
    },

    // 获取 tree
    getTreeData() {
      this.treeData = [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic'
            }
          ]
        }
      ]
    },

    open() {
      this.$nextTick(() => {
        this.$refs.ruleForm?.validate().catch((err) => false)
      })
    },
    close() {
      this.init()
    }
  },
  created() {
    this.init()
    this.getTreeData()
  },
  mounted() {
    this.$nextTick(() => {
      this.visible = true
    })
  },
  components: {},
  beforeDestroy() {}
}
</script>

<style lang="scss" src="./index.scss" scoped></style>
