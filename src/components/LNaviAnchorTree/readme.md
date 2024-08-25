#####1，使用方式

```ts
<div ref="containerRef" style="position:relative; width:100%; height:600px; border:1px solid blue; overflow-y:auto;">
  <LNaviAnchorTree ref="LNaviAnchorTreeRef" :list="naviList" />
  <div v-for="item in naviList" :id="item.id" :key="item.id">{{ item.id }}</div>
</div>

import { LNaviAnchorTree } from '@/components/LNaviAnchorTree'

const containerRef = ref()
const LNaviAnchorTreeRef = ref()
const naviList = ref([
  { id: '菜单0' },
  { id: '菜单1', children: [{ id: '菜单1-1' }, { id: '菜单1-2' }] },
  { id: '菜单2' },
])

onMounted(() => {
  nextTick(() => {
    // 父组件渲染完毕后，调用组件的init方法，因为需要用到容器dom实例
    LNaviAnchorTreeRef.value.init(containerRef.value)
  })
})
```

#####2，组件参数和事件
看源码...

#####3，slot

- #list-item：菜单项

#####4，注意点

- 滚动轴的容器，不可以用 static 定位，因为导航组件内部的计算用到了 offsetTop。如果`容器dom`是 static 定位，可以给它的样式加上【position: relative】；
- 导航 dom 与容器 dom 之间，可以存在非 static 定位的父 dom，但必须使用 V2 及以上版本；

#####5，版本
-----------------------------------V2

- fixbug
  【在`导航dom`与`容器dom`之间存在非 static 定位的`父dom`的情况下，由于 offsetTop 只能计算`导航dom`与最近的非 static 定位的`父dom`之间的距离而发生的错乱】
