// import { getToken } from "@/utils/auth";
import * as Api from "./api.js";

export default {
  props: {
    mode: {
      type: String,
      default: () => {
        return "view"; // ["view", "add", "update"]
      },
    },
  },
  data() {
    // 验证固定电话
    let validate1 = (rule, value, callback) => {
      let reg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/;

      if (!value) {
        callback(new Error("请输入"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的固话号码，例如：0571-12345678。"));
      } else {
        callback();
      }
    };

    // 验证手机号
    let validate2 = (rule, value, callback) => {
      let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;

      if (!value) {
        callback(new Error("请输入"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号，例如：13912345678。"));
      } else {
        callback();
      }
    };

    // 数组.length > 0（针对多项）
    let validate3 = ({ errName }, rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error(errName));
      } else {
        callback();
      }
    };

    // 不能为空（针对单选和输入）
    let validate4 = ({ errName }, rule, value, callback) => {
      if (value === null || value === "") {
        callback(new Error(errName));
      } else {
        callback();
      }
    };

    // 版本号（v1.0.0）
    let validate5 = (rule, value, callback) => {
      let reg = /^(v)([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/;

      if (!value) {
        callback(new Error("请输入"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的版本号，例如：v1.0.0"));
      } else {
        callback();
      }
    };

    return {
      // --------------------------------------------------------------文件上传
      // actionUrl: window.CONFIG.ipPrefix1 + "/OSS/uploadFiles",
      actionUrl:
        "http://10.101.5.231:9999/cube-module-directory/OSS/uploadFiles",
      uploadHeaders: {
        // 请求头
        // "X-Access-Token": getToken(),
        "X-Access-Token":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTA3MDIzODksInVzZXJuYW1lIjoieG1nbC1hZG1pbiJ9.QUq0Z4m6PTlLCe2tV6YLM_an6gDrAKbSU8a-39N8vWA",
      },
      uploadParam: {
        // 请求参数
        fileType: "",
      },

      // --------------------------------------------------------------校验
      rules: {
        // --------------------------------------特殊规则
        // 固话号码
        telephone: [
          {
            required: true,
            // message: "请输入",
            validator: validate1,
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // 手机号
        mobile: [
          {
            required: true,
            // message: "请输入",
            validator: validate2,
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // url
        url: [
          {
            type: "url",
            required: true,
            message: "请输入",
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // email
        email: [
          {
            type: "email",
            required: true,
            message: "请输入",
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // 版本号
        version: [
          {
            required: true,
            // message: "请输入",
            validator: validate5,
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // --------------------------------------数组.length > 0
        // 表格数据 > 0
        multipleTableRow: [
          {
            required: true,
            // message: "请选择",
            validator: validate3.bind(null, { errName: "请新增至少一条数据" }),
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // 选择数 > 0
        multipleSelect: [
          {
            required: true,
            // message: "请选择",
            validator: validate3.bind(null, { errName: "请选择" }),
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // 上传文件数 > 0
        multipleUpload: [
          {
            required: true,
            // message: "请选择",
            validator: validate3.bind(null, { errName: "请上传" }),
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // --------------------------------------单项不能为空
        // 不能为空（字符串输入框）
        input: [
          {
            required: true,
            // message: "请输入",
            validator: validate4.bind(null, { errName: "请输入" }),
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // 不能为空（单选）
        singleSelect: [
          {
            required: true,
            // message: "请选择",
            validator: validate4.bind(null, { errName: "请选择" }),
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
        // 不能为空（数字输入框）
        inputNumber: [
          {
            type: "number",
            required: true,
            message: "请输入",
            trigger: ["blur", "change"],
            transform: this.validateHook,
          },
        ],
      },
    };
  },

  methods: {
    // 上传成功
    async uploadOnSuccess(
      { obj, key, propName, refName = "ruleForm" },
      response,
      file,
      fileList
    ) {
      // console.log(obj, key, propName, response);
      if (response.result) {
        file.fileName = response.result.fileName; // fileName，是上传文件的fileKey值
        obj[key].push(file);

        if (propName) {
          this.$refs[refName].validateField(propName);
        }
      } else {
        this.$message.error(response);
      }
    },

    // 删除成功
    uploadHandleRemove(
      { obj, key, propName, refName = "ruleForm" },
      file,
      fileList
    ) {
      // console.log(file, fileList);
      obj[key] = obj[key].filter((x) => x.fileName !== file.fileName);

      if (propName) {
        this.$refs[refName].validateField(propName);
      }
    },

    // 上传前，接口参数里，设置文件类型
    beforeUpload(type, file) {
      if (file.size > 256 * 1024 * 1024) {
        // 判断是否超过文件大小限制
        this.$message.error("单个文件不超过256MB");
        return false;
      } else {
        this.uploadParam.fileType = type;
        return true;
      }
    },

    // 点击下载
    async handlePreview(file) {
      // console.log(333, file);
      // // 获取 文件地址
      // let res = await Api.getFileDownloadUrl(file.fileName);
      // window.open(res.result);

      let param = {
        name: file.name,
        fileKey: file.fileName,
      };
      Api.zhenwuyunDownloadFile(param);
    },
  },
};
