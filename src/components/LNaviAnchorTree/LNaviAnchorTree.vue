<template>
  <div class="LNaviAnchorTree">
    <el-tree
      :data="listConfirmed"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :props="defaultProps"
    >
      <template #default="{ node, data }">
        <div class="node-wrapper" @click="scrollTo(data.id)">
          <slot name="default" :node="node" :data="data">
            <!-- slot默认值 -->
            <span class="custom-tree-node">
              <div v-if="data.id === currentId" class="line"></div>
              <span class="label" :class="{ active: data.id === currentId }">{{ data.label ?? data.id }}</span>
            </span>
          </slot>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="tsx">
import $jq from 'jquery';
import { filterTree, convertToFlatArr } from '@/utils/index';
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
// ● props
export interface IList {
  id: string;
  label?: string;
  children?: IList;
  [key: string]: any;
}
export interface IProps {
  // 菜单数据
  list: IList[];
  // 填充。用垫片dom来填充容器节点的内容，使得容器节点的滚动条到底部时，使得最后一项菜单内容可以出现在容器节点视口的顶部，让最后一项菜单可以高亮
  // 注意：有个前提，list菜单数据的最后一项，必须是容器节点的最后一个子节点
  pad?: boolean;
  // 点击菜单时的定位速度（单位：ms）
  scrollSpeed?: number;
  // 滚动完毕
  afterScrollTo?: (() => void) | null;
  // 是否启动节流（启动的话，高亮菜单在轮动时，会缺失过渡效果）
  throttle?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  list: () => [],
  pad: false,
  scrollSpeed: 500,
  afterScrollTo: null,
  throttle: false,
});

let containerDom: HTMLElement | null = null; // 容器节点dom
const listConfirmed = ref<Required<IList>[]>([]); // list经过验证dom是否存在后的数据
const currentId = ref<string>(); // 当前高亮菜单的id
const throttleTimer = ref<ReturnType<typeof setTimeout>>(); // 定时器（节流）

const defaultProps = {
  children: 'children',
  label: 'label',
};

// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ methods
// 处理 菜单
function refresh() {
  // 过滤规则
  function rule(node: any) {
    // id对应的dom，是否存在
    return !!document.getElementById(node.id);
  }
  listConfirmed.value = filterTree(props.list, 'children', rule);

  if (!currentId.value) {
    currentId.value = listConfirmed.value[0]?.id;
  }

  if (props.pad) {
    // 填充 垫片dom，为了导航菜单可以高亮到最后一项
    const lastDom = document.getElementById(listConfirmed.value.at(-1)?.id as string);
    const padDom = document.getElementById('pad-dom');
    // 叠片dom的高度
    const padHeight = `calc(${containerDom?.offsetHeight ?? 0}px - ${lastDom?.offsetHeight ?? 0}px)`;

    if (padDom) {
      padDom.style.height = padHeight;
    } else {
      const dom = document.createElement('div');
      dom.id = 'pad-dom';
      dom.style.height = padHeight;
      containerDom?.appendChild(dom);
    }
  }
}

// 滚动
function scrollTo(id: string) {
  $jq(containerDom).animate(
    {
      scrollTop: computeOffsetTop(document.getElementById(id)),
    },
    props.scrollSpeed,
    'swing',
    () => {
      setTimeout(() => {
        // 如果不进行延迟处理的话，当afterScrollTo里使用到currentId，会显示上一次的值
        props.afterScrollTo?.();
      }, 100);
    }
  );
}

// scroll事件的回调
function scrollHandler() {
  // 节流（会缺失高亮菜单项切换的轮动效果）
  if (props.throttle) {
    clearTimeout(throttleTimer.value);
    throttleTimer.value = setTimeout(scrollHandlerCallback, 50);
  } else {
    scrollHandlerCallback();
  }
}

// scroll事件的回调具体实现
function scrollHandlerCallback() {
  const flatArr = convertToFlatArr(listConfirmed.value);
  for (let i = 0; i < flatArr.length; i++) {
    const dom = document.getElementById(flatArr[i].id);
    if (dom) {
      // if (dom.offsetTop > containerDom.scrollTop) {
      if (computeOffsetTop(dom) > containerDom.scrollTop) {
        // 【dom相对容器节点的距离 > 滑块相对容器节点的距离】，说明当前视口的顶部处于上一个dom的内容中
        currentId.value = flatArr[i - 1].id;
        break;
      } else if (i === flatArr.length - 1) {
        // 如果是最后一项，则高亮最后一项的id
        currentId.value = flatArr[i].id;
      }
    }
  }
}

// 监听scroll
function scrollListen() {
  if (containerDom) {
    containerDom.onscroll = scrollHandler;
  }
}

// 递归计算 dom与容器dom之间的距离（因为offsetTop只是计算与最近的非static定位的父dom之间的距离，而实际上，导航dom与容器之间可能的存在非static定位的dom情况）
function computeOffsetTop(dom, initTopValue = 0) {
  if (dom.offsetParent === containerDom) {
    // offsetParent是最近的非static定位的父dom，offsetTop计算的也是与最近的非static定位的父dom之间的距离
    return initTopValue + dom.offsetTop;
  } else {
    return computeOffsetTop(dom.offsetParent, dom.offsetTop);
  }
}
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ other
watch(
  () => props.list,
  () => {
    if (containerDom) {
      refresh();
    }
  },
  {
    deep: true,
    // immediate: true
    // flush: 'post'
  }
);

// 初始化
function init(container: HTMLElement) {
  // 赋值 容器节点dom
  containerDom = container;
  // 监听 容器节点dom的scroll事件
  scrollListen();
  // 处理 菜单
  refresh();
}

onBeforeUnmount(() => {
  if (containerDom) {
    // 解绑
    containerDom.onscroll = null;
  }
});

defineExpose({
  // 当前高亮的菜单id
  currentId,
  // 初始化
  init,
});

// ------------------------------------------------------------------- todo
// scrollTo前、scrollTo后的回调；
</script>

<style lang="scss" src="./index.scss" scoped></style>
