<template>
  <div class="page2">
    <!-- //////////////////////////////////////////////////////////////////////// -->
    <el-switch v-model="theme" @click="toggleDark()"></el-switch>
    <el-button>按钮</el-button>

    <!-- //////////////////////////////////////////////////////////////////////// -->
    <el-avatar :size="60" src="https://empty" @error="errorHandler">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
    </el-avatar>

    <!-- //////////////////////////////////////////////////////////////////////// -->
    <div class="wrapper">
      <h1>fjsjfldsjfdjlk</h1>
      <div class="bg"></div>
    </div>

    <!-- //////////////////////////////////////////////////////////////////////// -->
    <el-carousel :interval="5000" arrow="always" ref="myCarousel" @change="change">
      <el-carousel-item v-for="item in 4" :key="item" :label="item">
        <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts" name="page2">
import { isDark, toggleDark } from './toggleDark'
const theme = ref(false)
const myCarousel = ref()

const errorHandler = (param) => {
  console.log(11, param)
}

const change = (page) => {
  console.log(page)
}

onMounted(async () => {
  await nextTick()
  myCarousel.value.setActiveItem(2)
})
</script>

<style lang="scss" src="./index.scss" scoped></style>
