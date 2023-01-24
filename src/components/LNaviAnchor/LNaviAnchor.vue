<template>
  <div ref="LNaviAnchorRef" class="LNaviAnchor">
    <template v-for="(item, index) in listConfirmed" :key="item.id">
      <div @click="scrollTo(item.id)">
        <slot name="list-item" :item="item" :index="index">
          <!-- slot默认值 -->
          <div class="navi-item" :class="{ active: item.id === currentId }">
            <span>{{ item.title }}</span>
          </div>
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="tsx">
import $jq from 'jquery'
// ------------------------------------------------------------------- data
// ● props
const props = defineProps({
  // 菜单数据
  list: {
    type: Array,
    default: () => []
  },
  // 填充。用垫片dom来填充父节点的内容，使得父节点的滚动条到底部时，使得最后一项菜单内容可以出现在父节点视口的顶部，让最后一项菜单可以高亮
  // 注意：有个前提，list菜单数据的最后一项，必须是父节点的最后一个子节点
  pad: {
    type: Boolean,
    default: () => false
  },
  // 点击菜单时的定位速度（单位：ms）
  scrollSpeed: {
    type: Number,
    default: () => 500
  }
})

let parentDom = null // 容器dom（也就是父节点）
const LNaviAnchorRef = ref()
const listConfirmed = ref([]) // list经过验证dom是否存在后的数据
const currentId = ref(null) // 当前高亮菜单的id
// const throttleTimer = ref(null) // 定时器（节流）

// ------------------------------------------------------------------- methods
// 处理 菜单
function refresh() {
  // 验证id对应的dom，是否存在
  let arr = props.list.filter((x) => {
    let dom = document.getElementById(x.id)
    return dom
  })

  listConfirmed.value = arr.map((x) => {
    x.title = x.title ?? x.id
    return x
  })

  if (!currentId.value) {
    currentId.value = listConfirmed.value[0]?.id
  }

  if (props.pad) {
    // 填充 垫片dom，为了导航菜单可以高亮到最后一项
    let lastDom = document.getElementById(listConfirmed.value.at(-1)?.id)
    let padDom = document.getElementById('pad-dom')
    // 叠片dom的高度
    let padHeight = `calc(${parentDom?.offsetHeight ?? 0}px - ${lastDom?.offsetHeight ?? 0}px)`

    if (padDom) {
      padDom.style.height = padHeight
    } else {
      let dom = document.createElement('div')
      dom.id = 'pad-dom'
      dom.style.height = padHeight
      parentDom.appendChild(dom)
    }
  }
}

// 滚动
function scrollTo(id) {
  $jq(parentDom).animate(
    {
      scrollTop: document.getElementById(id).offsetTop
    },
    props.scrollSpeed
  )
}

// scroll事件的回调
function scrollHander() {
  // // 节流（会缺失高亮菜单项切换的轮动效果）
  // clearTimeout(throttleTimer.value)
  // throttleTimer.value = setTimeout(() => {
  //   for (let i = 0; i < listConfirmed.value.length; i++) {
  //     let dom = document.getElementById(listConfirmed.value[i].id)
  //     if (dom) {
  //       if (dom.offsetTop > parentDom.scrollTop) {
  //         // 【dom相对父节点的距离 > 滑块相对父节点的距离】，说明当前视口的顶部处于上一个dom的内容中
  //         currentId.value = listConfirmed.value[i - 1].id
  //         break
  //       } else if (i === listConfirmed.value.length - 1) {
  //         // 如果是最后一项，则高亮最后一项的id
  //         currentId.value = listConfirmed.value[i].id
  //       }
  //     }
  //   }
  // }, 50)

  for (let i = 0; i < listConfirmed.value.length; i++) {
    let dom = document.getElementById(listConfirmed.value[i].id)
    if (dom) {
      if (dom.offsetTop > parentDom.scrollTop) {
        // 【dom相对父节点的距离 > 滑块相对父节点的距离】，说明当前视口的顶部处于上一个dom的内容中
        currentId.value = listConfirmed.value[i - 1].id
        break
      } else if (i === listConfirmed.value.length - 1) {
        // 如果是最后一项，则高亮最后一项的id
        currentId.value = listConfirmed.value[i].id
      }
    }
  }
}

// 父节点监听scroll
function scrollListen() {
  if (parentDom) {
    parentDom.onscroll = scrollHander
  }
}
// ------------------------------------------------------------------- other
watch(
  () => props.list,
  () => {
    if (parentDom) {
      refresh()
    }
  },
  {
    deep: true
    // immediate: true
    // flush: 'post'
  }
)

// 初始化
function init() {
  // 赋值 父节点dom
  parentDom = LNaviAnchorRef.value.parentNode
  // 监听 父节点dom的scroll事件
  scrollListen()
  // 处理 菜单
  refresh()
}

onBeforeUnmount(() => {
  if (parentDom) {
    // 解绑
    parentDom.onscroll = null
  }
})

defineExpose({
  currentId,
  init
})

// ------------------------------------------------------------------- todo
// scrollTo前、scrollTo后的回调；
</script>

<style lang="scss" src="./index.scss" scoped></style>
