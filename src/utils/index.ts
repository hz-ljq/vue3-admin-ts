// --------------------------------------------------------扁平化数组 → 树结构
export const convertToTree = (flatArr: any[]) => {
  const idMap = {}
  flatArr.forEach(x => {
    x && (idMap[x.id] = x)
  })

  const jsonTree: any[] = []
  flatArr.forEach(x => {
    if (x) {
      const parent = idMap[x.parentId]
      if (parent) {
        !parent.children && (parent.children = [])
        parent.children.push(x)
      } else {
        jsonTree.push(x)
      }
    }
  })

  return jsonTree
}

// --------------------------------------------------------树结构 → 扁平化数组
export function convertToFlatArr(treeData: any[]) {
  return treeData.reduce((acc, val) => {
    const flag = Array.isArray(val.children) && val.children.length > 0 // 递归的条件（children字段存在，并且存在子节点）；
    return flag
      ? acc.concat({ ...val, children: [] }, ...convertToFlatArr(val.children))
      : acc.concat(val) // 把自身节点也放进去，并且，将children覆盖为空数组；
  }, [])
}

// --------------------------------------------------------树结构（过滤）
// 过滤树结构（arr：树结构数组；childrenName：children的key名；rule：过滤规则）
export function filterTree(
  arr: any[] = [],
  childrenName = 'children',
  rule: Function
) {
  return arr
    .filter(item => {
      return rule(item)
    })
    .map(item => {
      item = Object.assign({}, item)
      if (item[childrenName]) {
        item[childrenName] = filterTree(item[childrenName], childrenName, rule)
      }
      return item
    })
}

// --------------------------------------------------------深拷贝（source：原数据，target：深拷贝的副本数据）
function isObject(obj: any) {
  return typeof obj === 'object' && obj !== null
}
export const deepClone = (source, hash = new WeakMap()) => {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source)
  const target = Array.isArray(source) ? [] : {}
  hash.set(source, target)
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = deepClone(source[key], hash)
    }
  }
  return target
}

// --------------------------------------------------------为echarts实例设置自动resize
import * as echarts from 'echarts'
// import lodash from 'lodash'
import { addListener, removeListener } from 'resize-detector'
export function bindResizeForEcharts() {
  // 由于echarts5执行过preventExtensions()，因此我们不能为其额外添加自定义属性，所以需要深拷贝一份
  // const echartsCopy = lodash.cloneDeep(echarts)
  const echartsCopy = deepClone(echarts)

  // 新增方法（当div大小发生变化，自动调用echarts的resize方法）： 初始化echarts实例
  echartsCopy.initWithResize = (dom, theme, opts) => {
    const instance = echartsCopy.init(dom, theme, opts)

    const listener = element => {
      // 监听回调
      // var width = element.offsetWidth;
      // var height = element.offsetHeight;
      // console.log('Size: ' + width + 'x' + height);
      instance.resize()
    }
    removeListener(dom, listener) // 防止重复监听
    addListener(dom, listener) // 监听

    // 新增方法（销毁实例时，自动解除监听）： 销毁echarts实例
    instance.disposeWithResize = () => {
      removeListener(dom, listener) // 解除监听
      instance.dispose()
    }
    return instance
  }

  return echartsCopy
}

// --------------------------------------------------------深度合并（支持多个对象合并）
// 判断对象是否是一个纯粹的对象
function isPlainObject(obj: {}) {
  return (
    typeof obj === 'object' &&
    Object.prototype.toString.call(obj) === '[object Object]'
  )
}
// ● 深度合并多个对象
export function deepAssign(...rest: any[]) {
  const len = rest.length
  let target = rest[0]
  if (!isPlainObject(target)) {
    target = {}
  }
  for (let i = 1; i < len; i++) {
    const source = rest[i]
    if (isPlainObject(source)) {
      for (const s in source) {
        if (s === '__proto__' || target === source[s]) {
          continue
        }
        if (isPlainObject(source[s])) {
          target[s] = deepAssign(target[s], source[s])
        } else {
          target[s] = source[s]
        }
      }
    }
  }
  return target
}

// --------------------------------------------------------解析url参数
export const param2Obj = (url: string): {} => {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
