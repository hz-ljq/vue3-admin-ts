// import { getToken } from "@/utils/auth";
import * as Api from './api'
import { ElMessage } from 'element-plus'

export default function ({ validateHook } = {}) {
  // -------------------------------------------------------------------校验相关
  // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
  let rules = reactive({
    // --------------------------------------特殊规则
    // 固话号码
    telephone: (errorText1 = '请输入', errorText2 = '请输入正确的固话号码，例如：0571-12345678。') => [
      {
        required: true,
        // message: "请输入",
        validator: validate1.bind(null, { errorText1, errorText2 }),
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // 手机号
    mobile: (errorText1 = '请输入', errorText2 = '请输入正确的手机号，例如：13912345678。') => [
      {
        required: true,
        // message: "请输入",
        validator: validate2.bind(null, { errorText1, errorText2 }),
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // url
    url: (errorText1 = '请输入', errorText2 = '请输入正确的url地址') => [
      {
        required: true,
        message: errorText1,
        trigger: ['blur', 'change'],
        transform: validateHook
      },
      {
        type: 'url',
        required: true,
        message: errorText2,
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // email
    email: (errorText1 = '请输入', errorText2 = '请输入正确的邮箱地址') => [
      {
        required: true,
        message: errorText1,
        trigger: ['blur', 'change'],
        transform: validateHook
      },
      {
        type: 'email',
        required: true,
        message: errorText2,
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // 版本号
    version: (errorText1 = '请输入', errorText2 = '请输入正确的版本号，例如：v1.0.0') => [
      {
        required: true,
        // message: "请输入",
        validator: validate5.bind(null, { errorText1, errorText2 }),
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // --------------------------------------数组.length > 0
    // 表格数据 > 0
    multipleTableRow: (errorText = '请新增至少一条数据') => [
      {
        required: true,
        // message: "请选择",
        validator: validate3.bind(null, { errorText }),
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // 选择数 > 0
    multipleSelect: (errorText = '请选择') => [
      {
        required: true,
        // message: "请选择",
        validator: validate3.bind(null, { errorText }),
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // 上传文件数 > 0
    multipleUpload: (errorText = '请上传') => [
      {
        required: true,
        // message: "请选择",
        validator: validate3.bind(null, { errorText }),
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // --------------------------------------单项不能为空
    // 不能为空（字符串输入框）
    input: (errorText = '请输入') => [
      {
        required: true,
        // message: "请输入",
        validator: validate4.bind(null, { errorText }),
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // 不能为空（单选）
    singleSelect: (errorText = '请选择') => [
      {
        required: true,
        // message: "请选择",
        validator: validate4.bind(null, { errorText }),
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ],
    // 不能为空（数字输入框）
    inputNumber: (errorText = '请输入') => [
      {
        type: 'number',
        required: true,
        message: errorText,
        trigger: ['blur', 'change'],
        transform: validateHook
      }
    ]
  })

  // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ methods
  // 验证固定电话
  function validate1({ errorText1, errorText2 }, rule, value, callback) {
    let reg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/

    if (!value) {
      callback(new Error(errorText1))
    } else if (!reg.test(value)) {
      callback(new Error(errorText2))
    } else {
      callback()
    }
  }

  // 验证手机号
  function validate2({ errorText1, errorText2 }, rule, value, callback) {
    let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/

    if (!value) {
      callback(new Error(errorText1))
    } else if (!reg.test(value)) {
      callback(new Error(errorText2))
    } else {
      callback()
    }
  }

  // 数组.length > 0（针对多项）
  function validate3({ errorText }, rule, value, callback) {
    if (!value || value.length === 0) {
      callback(new Error(errorText))
    } else {
      callback()
    }
  }

  // 不能为空（针对单选和输入）
  function validate4({ errorText }, rule, value, callback) {
    if (value === null || value === '') {
      callback(new Error(errorText))
    } else {
      callback()
    }
  }

  // 版本号（v1.0.0）
  function validate5({ errorText1, errorText2 }, rule, value, callback) {
    let reg = /^(v)([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/

    if (!value) {
      callback(new Error(errorText1))
    } else if (!reg.test(value)) {
      callback(new Error(errorText2))
    } else {
      callback()
    }
  }

  // -------------------------------------------------------------------文件上传
  // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
  // actionUrl: window.CONFIG.ipPrefix1 + "/OSS/uploadFiles",
  let actionUrl = ref('http://10.101.5.244:9999/cube-module-directory/OSS/uploadFiles')
  let uploadHeaders = reactive({
    // 请求头
    // "X-Access-Token": getToken(),
    'X-Access-Token':
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjQ5NTc2NDQsInVzZXJuYW1lIjoiYWRtaW4ifQ.n01-4IgfBPT9fdY8PjM1QkeeueNkERGQp2QKEFsiIa4'
  })
  let uploadParam = reactive({
    // 请求参数
    fileType: ''
  })

  // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ methods
  // 上传成功
  async function uploadOnSuccess({ obj, key, propName, formRef }, response, file, fileList) {
    // console.log(obj, key, propName, response);
    if (response.result) {
      file.fileName = response.result.fileName // fileName，是上传文件的fileKey值
      obj[key].push(file)
      formRef?.validateField(propName)
    } else {
      ElMessage.error(response)
    }
  }

  // 删除成功
  function uploadHandleRemove({ obj, key, propName, formRef }, file, fileList) {
    // console.log(file, fileList);
    obj[key] = obj[key].filter((x) => x.fileName !== file.fileName)
    formRef?.validateField(propName)
  }

  // 上传前，接口参数里，设置文件类型
  function beforeUpload(type, file) {
    if (file.size > 256 * 1024 * 1024) {
      // 判断是否超过文件大小限制
      ElMessage.error('单个文件不超过256MB')
      return false
    } else {
      uploadParam.fileType = type
      return true
    }
  }

  // 点击下载
  async function handlePreview(file) {
    // console.log(333, file);
    // // 获取 文件地址
    // let res = await Api.getFileDownloadUrl(file.fileName);
    // window.open(res.result);

    let param = {
      name: file.name,
      fileKey: file.fileName
    }
    Api.zhenwuyunDownloadFile(param)
  }

  return {
    // -------------------------校验相关
    rules,
    // -------------------------文件上传
    // ----data
    actionUrl,
    uploadHeaders,
    uploadParam,
    // ----methods
    uploadOnSuccess,
    uploadHandleRemove,
    beforeUpload,
    handlePreview
  }
}
