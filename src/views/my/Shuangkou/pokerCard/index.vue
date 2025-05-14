<template>
  <div class="pokerCard">
    <div class="left-top">
      <div>{{ card[1] }}</div>
      <div>{{ card[0] }}</div>

    </div>
    <div class="right-bottom">
      <div>{{ card[1] }}</div>
      <div>{{ card[0] }}</div>
    </div>
    <div class="mid"></div>
  </div>
</template>

<script setup lang="tsx" name="pokerCard">
// 分隔符
// ■■■■■■■■■■■■■■■■■■■■■■■■■■
// ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎
// --------------------------

// ● props
const props = defineProps({
  card: {
    type: String,
    default: '',
  },
});

// ● emits
const emits = defineEmits(['get-ready']);

const suits = ['C', 'D', 'H', 'S']; // 梅花、方片、红桃、黑桃
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
</script>

<style lang="scss" src="./index.scss" scoped></style>
