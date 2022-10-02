// import request from '@/utils/axiosReq'

// 列表的mock数据
let mockListData = []
for (let i = 0; i < 200; i++) {
  mockListData.push({
    id: i,
    val1: 'xxx' + (i + 1),
    val2: Math.floor(1 + Math.random() * 3)
  })
}

// 获取 列表数据
export function getListData(data) {
  let { pageNum, pageSize, val1, val2 } = data

  return new Promise((resolve) => {
    setTimeout(() => {
      let listData = mockListData.filter((x) => {
        return (val1 === null ? true : x.val1.includes(val1)) && (val2 === null ? true : x.val2 === val2)
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

// 详情
export function getDetail({ id }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let item = mockListData.find((x) => x.id === id)
      resolve({ result: JSON.parse(JSON.stringify(item)) })
    }, 300)
  })
}

// 删除
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
