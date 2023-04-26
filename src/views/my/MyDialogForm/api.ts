import request from '@/utils/axiosReq'

// 提交
export function submit() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("成功");
    }, 500);
  });
}

// 获取 上传文件的url地址
export function getFileDownloadUrl() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("url地址");
    }, 500);
  });
}

// 获取 上传文件的二进制数据，并下载
export function zhenwuyunDownloadFile(data) {
  return request({
    baseURL: "http://10.101.5.244:9999/cube-module-directory",
    url: "/OSS/zhenwuyunDownloadFile",
    method: "post",
    data,
    responseType: "blob",
  }).then((res) => {
    console.log(55, res);
    var url = window.URL.createObjectURL(res);
    console.log(55, url);
    var ele = document.createElement("a");
    ele.href = url;
    ele.download = data.name;
    ele.click();
    window.URL.revokeObjectURL(url); // 释放
  });
}

// 文件下载（通过url）
export async function fileDownload({
  name,
  url
}: {
  name: string
  url: string
}) {
  const ele = document.createElement('a')
  // 获取二进制文件流（blob）
  const res = await fetch(url).then(response => response.blob())
  const blobUrl = window.URL.createObjectURL(res)
  ele.href = blobUrl
  ele.download = name // 设置文件名
  ele.click() // 下载
  window.URL.revokeObjectURL(blobUrl) // 释放
}
