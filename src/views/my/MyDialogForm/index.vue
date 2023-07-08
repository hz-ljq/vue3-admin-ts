<template>
  <div class="MyDialogForm">
    <el-dialog
      v-model="visible"
      class="my-dialog"
      title="我是标题（弹出框）"
      align-center
      :destroy-on-close="true"
      @open="open"
      @closed="init"
    >
      <el-form ref="formRef" id="my-form" class="my-form" :model="form" :rules="rules" label-width="180px">
        <div
          style="position: absolute; right: 80px; top: 20px; color: red; font-size: 20px; cursor: pointer"
          @click="setFormData"
        >
          一键填充
        </div>
        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ （异步校验）类型 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-row>
          <el-col :span="24">
            <el-divider>（异步校验）类型</el-divider>
          </el-col>
          <el-col :span="8">
            <el-form-item label="字符串输入框(单行)" prop="name">
              <el-input v-model="form.name" placeholder="请输入" clearable :disabled="mode === 'view'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ （输入）类型 ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ -->
        <el-row>
          <el-col :span="24">
            <el-divider>（输入）类型</el-divider>
          </el-col>
          <el-col :span="8">
            <el-form-item label="字符串输入框(单行)" prop="val1" :rules="rules.input()">
              <el-input v-model="form.val1" placeholder="请输入" clearable :disabled="mode === 'view'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数字输入框" prop="val2" :rules="rules.inputNumber()">
              <el-input-number
                v-model="form.val2"
                controls-position="right"
                :min="0"
                :precision="4"
                :step="1"
                :disabled="mode === 'view'"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="字符串输入框(多行)" prop="val3" :rules="rules.input()">
              <el-input
                v-model="form.val3"
                type="textarea"
                :rows="1"
                maxlength="200"
                show-word-limit
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
            <el-form-item label="下拉框(单选)" prop="val4" :rules="rules.singleSelect()">
              <el-select v-model="form.val4" placeholder="请选择" filterable clearable :disabled="mode === 'view'">
                <el-option
                  v-for="item in Sel.convertToArray(Sel.opt100)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下拉框(多选)" prop="val5" :rules="rules.multipleSelect()">
              <el-select
                v-model="form.val5"
                placeholder="请选择"
                filterable
                multiple
                clearable
                :disabled="mode === 'view'"
              >
                <el-option
                  v-for="item in Sel.convertToArray(Sel.opt100)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="级联选择器(单选)" prop="val6" :rules="rules.singleSelect()">
              <el-cascader
                v-model="form.val6"
                placeholder="请选择"
                :options="treeData"
                :props="cascaderProps"
                filterable
                clearable
                :disabled="mode === 'view'"
              ></el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="时间选择器" prop="val7" :rules="rules.singleSelect()">
              <el-date-picker
                v-model="form.val7"
                type="date"
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                :disabled="mode === 'view'"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="radio" prop="val8" :rules="rules.singleSelect()">
              <el-radio-group v-model="form.val8" :disabled="mode === 'view'">
                <el-radio v-for="item in Sel.convertToArray(Sel.opt100)" :key="item.value" :label="item.value">
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="switch" prop="val9" :rules="rules.singleSelect()">
              <el-switch v-model="form.val9" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="checkbox" prop="val10" :rules="rules.multipleSelect()">
              <el-checkbox-group v-model="form.val10" :disabled="mode === 'view'">
                <el-checkbox v-for="item in Sel.convertToArray(Sel.opt100)" :key="item.value" :label="item.value">
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
            <el-form-item label="表格" prop="tableList" :rules="rules.multipleTableRow()">
              <el-table border :data="form.tableList" style="width: 100%" max-height="240">
                <el-table-column label="姓名" min-width="300px">
                  <template #default="scope">
                    <el-form-item :prop="`tableList.${scope.$index}.name`" :rules="rules.input()" :show-message="false">
                      <el-input
                        v-model="scope.row.name"
                        placeholder="请输入"
                        clearable
                        :disabled="mode === 'view'"
                      ></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="文件上传" prop="files" min-width="200px">
                  <template #default="scope">
                    <el-form-item
                      :prop="`tableList.${scope.$index}.files`"
                      :rules="rules.multipleUpload()"
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
                            propName: `tableList.${scope.$index}.files`,
                            formRef: formRef,
                          })
                        "
                        :before-upload="beforeUpload.bind(null, 13)"
                        :on-remove="
                          uploadHandleRemove.bind(null, {
                            obj: scope.row,
                            key: 'files',
                            propName: `tableList.${scope.$index}.files`,
                            formRef: formRef,
                          })
                        "
                        :on-preview="downloadFile"
                        :limit="10"
                        :disabled="mode === 'view'"
                      >
                        <template #trigger>
                          <el-button type="primary" plain icon="upload" :disabled="mode === 'view'">点击上传</el-button>
                        </template>
                        <!-- <el-button type="primary" plain icon="upload" :disabled="mode === 'view'">点击上传</el-button> -->
                        <template #tip>
                          <span class="el-upload__tip">（单文件限256MB）</span>
                        </template>
                      </el-upload>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="80">
                  <template #default="scope">
                    <el-button
                      type="primary"
                      link
                      :disabled="mode === 'view'"
                      @click.prevent="delTableRow('表格', scope.$index)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="add-btn">
                <el-button
                  type="primary"
                  link
                  icon="plus"
                  :disabled="mode === 'view'"
                  @click.prevent="addTableRow('表格')"
                >
                  新增
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- form按钮 -->
        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="submit">
            {{ submitLoading ? '正在提交...' : '提交' }}
          </el-button>
          <el-button @click="visible = false">取消</el-button>
        </el-form-item>
      </el-form>

      <el-form ref="formRef2" class="my-form" :model="form2" :rules="rules" label-suffix="：" label-width="240px">
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
            <el-form-item label="输入框0" prop="stepInfo.val100" :rules="rules.input()">
              <el-input
                v-model="form2.stepInfo.val100"
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
            <el-form-item label="输入框1" prop="stepInfo.val101" :rules="rules.input()">
              <el-input
                v-model="form2.stepInfo.val101"
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
            <el-form-item label="输入框2" prop="stepInfo.val102" :rules="rules.input()">
              <el-input
                v-model="form2.stepInfo.val102"
                placeholder="请输入"
                clearable
                :disabled="mode === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- dialog按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>

          <template v-if="stepsActive === 0">
            <el-button type="primary" @click="stepPlus">下一步</el-button>
          </template>

          <template v-if="stepsActive === 1">
            <el-button @click="stepMinus">上一步</el-button>
            <el-button type="primary" @click="stepPlus">下一步</el-button>
          </template>

          <template v-if="stepsActive === 2">
            <el-button @click="stepMinus">上一步</el-button>
            <el-button type="primary" @click="stepPlus">提交</el-button>
          </template>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="MyDialogForm">
import * as Sel from './selectOpt';
import * as Api from './api';
import elFormHook from './elFormHook';
import { ElMessage } from 'element-plus';

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
// ● props
const props = defineProps({
  mode: {
    type: [String],
    default: 'add', // ["view", "add", "update"]
  },
});

const {
  // 校验相关
  rules: rulesFromHook,
  // 文件上传
  actionUrl,
  uploadHeaders,
  uploadParam,
  uploadOnSuccess,
  uploadHandleRemove,
  beforeUpload,
  previewFile,
  downloadFile,
} = elFormHook({ validateHook });

const formRef = ref();
const formRef2 = ref();

const treeData = ref<any[]>([]);
const cascaderProps = reactive({
  expandTrigger: 'hover',
  emitPath: false,
  checkStrictly: true,
});

const visible = ref(false);
const form = ref<any>(null);
const form2 = ref<any>(null);
const rules = reactive({
  name: [
    {
      required: true,
      // message: "请输入",
      validator: asyncName,
      trigger: ['blur', 'change'],
      transform: validateHook,
    },
  ],
  ...rulesFromHook,
});
const submitLoading = ref(false);

const stepsActive = ref(0); // 当前步骤
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ methods
// 异步校验
async function asyncName(rule, value, callback) {
  const prom = (name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === '123') {
          resolve({
            result: false,
          });
        } else {
          resolve({
            result: true,
          });
        }
      }, 200);
    });
  };

  if (!value) {
    callback(new Error('请输入'));
  } else {
    const res: any = await prom(value);
    if (res.result) {
      callback();
    } else {
      callback(new Error('该名称已存在，请重新输入。'));
    }
  }
}
// 一键填充
function setFormData() {
  form.value = {
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
            fileName: 'doc/199be6db30794180a9b8d2874f1b9b25.png',
          },
        ],
      },
    ],
  };

  nextTick(() => {
    formRef.value.validate().catch((err) => false);
  });
}
// 新增一行
function addTableRow(tableOf) {
  if (tableOf === '表格') {
    form.value.tableList.push({
      name: null,
      files: [],
    });
  }
  formRef.value.validate().catch((err) => false);
}
// 删除一行
function delTableRow(tableOf, index) {
  if (tableOf === '表格') {
    form.value.tableList.splice(index, 1);
  }
  formRef.value.validate().catch((err) => false);
}
// 校验钩子
function validateHook(value) {
  // do something
  return value;
}
// 上一步
function stepMinus() {
  stepsActive.value--;
}
// 下一步
function stepPlus() {
  formRef2.value.validate((valid) => {
    if (valid) {
      if (stepsActive.value === 2) {
        submitLoading.value = true;
        Api.submit()
          .then(() => {
            stepsActive.value = 0;
            ElMessage({
              // showClose: true,
              message: '提交成功！',
              type: 'success',
            });
          })
          .catch((err) => {})
          .finally(() => {
            submitLoading.value = false;
          });
      } else {
        stepsActive.value++;
      }
    }
  });
}
// 提交
function submit() {
  formRef.value.validate((valid, errObj) => {
    if (valid) {
      submitLoading.value = true;
      Api.submit()
        .then(() => {
          ElMessage({
            // showClose: true,
            message: '提交成功！',
            type: 'success',
          });
        })
        .catch((err) => {})
        .finally(() => {
          submitLoading.value = false;
        });
    } else {
      console.log('校验未通过！', errObj);
      console.log('error submit!!');
      return false;
    }
  });
}
// 初始化
function init() {
  // 初始化表单
  form.value = {
    // （异步校验）类型
    name: '123',
    // （输入）类型
    val1: null,
    val2: 0,
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
    ],
  };

  // 初始化表单
  form2.value = {
    stepInfo: {
      val100: null, // 第0步
      val101: null, // 第1步
      val102: null, // 第2步
    },
  };

  // 重置当前步骤
  stepsActive.value = 0;
  // 清除校验
  nextTick(() => {
    formRef.value?.clearValidate();
  });
}

// 获取 tree
function getTreeData() {
  treeData.value = [
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
              label: '一致',
            },
          ],
        },
        {
          value: 'daohang',
          label: '导航',
          children: [
            {
              value: 'cexiangdaohang',
              label: '侧向导航',
            },
          ],
        },
      ],
    },
    {
      value: 'zujian',
      label: '组件',
      children: [
        {
          value: 'basic',
          label: 'Basic',
        },
      ],
    },
  ];
}

function open() {
  nextTick(() => {
    formRef.value?.validate().catch((err) => false);
  });
}

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ other
onBeforeMount(() => {
  init();
  getTreeData();
});
onMounted(() => {
  visible.value = true;
});
</script>

<style lang="scss" src="./index.scss" scoped></style>
