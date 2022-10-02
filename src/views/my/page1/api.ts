import request from '@/utils/axiosReq'

// 列表的mock数据
let mockListData = []
for (let i = 0; i < 200; i++) {
  mockListData.push({
    id: i,
    name: 'xxx' + (i + 1),
    status: Math.floor(1 + Math.random() * 3)
  })
}

// 获取 列表数据
export function getListData(data) {
  let { pageNum, pageSize, name, status } = data

  return new Promise((resolve) => {
    setTimeout(() => {
      let listData = mockListData.filter((x) => {
        return (name === null ? true : x.name.includes(name)) && (status === null ? true : x.status === status)
      })
      let total = listData.length

      listData = listData.slice(pageSize * (pageNum - 1), pageSize * pageNum)

      let res = {
        result: {
          total,
          listData
        }
      }

      resolve(res)
    }, 300)
  })
}

// 获取 列表数据
export function del(data) {
  let { id } = data
  return new Promise((resolve) => {
    setTimeout(() => {
      mockListData.splice(id, 1)
      resolve('删除成功')
    }, 300)
  })
}

// 提交
export function submit() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('成功')
    }, 500)
  })
}
