<template>
  <div class="detailForm">
    <el-dialog class="my-dialog" title="我是标题（弹出框）" v-model="visible" @open="open" :destroy-on-close="true">
      <el-form class="my-form" :model="form" ref="ruleForm" label-width="180px">
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
              <el-select v-model="form.val2" placeholder="请选择" filterable clearable :disabled="mode === 'view'">
                <el-option
                  v-for="item in Sel.convertToArray(Sel.opt101)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- form按钮 -->
        <!-- <el-form-item>
          <el-button type="primary" @click="submit" :loading="submitLoading">
            {{ submitLoading ? '正在提交...' : '提交' }}
          </el-button>
          <el-button @click="visible = false">取消</el-button>
        </el-form-item> -->
      </el-form>

      <!-- dialog按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit">
          {{ submitLoading ? '正在提交...' : '提交' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="detailForm">
import * as Api from '../api'
import * as Sel from '../selectOpt'
import { ElMessage } from 'element-plus'
import elFormHook from './elFormHook'

// -------------------------------------------------------------------props、emits
// props
const props = defineProps({
  id: {
    type: [String, Number],
    default: null
  },
  mode: {
    type: [String],
    default: 'view' // ["view", "add", "update"]
  }
})
// emits
const emits = defineEmits(['submited'])

// -------------------------------------------------------------------data
let { xxx } = elFormHook()
console.log(xxx)
let visible = ref(false)
let form = ref({
  val1: null,
  val2: null
})
let submitLoading = ref(false)
let ruleForm = ref()

// -------------------------------------------------------------------methods
// 提交
function submit() {
  ruleForm.value.validate((valid) => {
    if (valid) {
      submitLoading.value = true
      Api.submit()
        .then(() => {
          visible.value = false
          ElMessage({
            // showClose: true,
            message: '提交成功！',
            type: 'success'
          })
          emits('submited')
        })
        .catch((err) => {})
        .finally(() => {
          submitLoading.value = false
        })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

function open() {
  if (props.mode !== 'add' && props.id !== null) {
    let param = { id: props.id }
    Api.getDetail(param).then((res) => {
      form.value = res.result
      nextTick(() => {
        ruleForm.value?.validate().catch((err) => false)
      })
    })
  }
}

// -------------------------------------------------------------------暴露到组件外部
defineExpose({
  visible
})
</script>

<style lang="scss" src="./index.scss" scoped></style>
