<template>
  <div class="pokerCard" @click="emits('click')">
    <template v-for="(item, index) in 3" :key="index">
      <!-- 中间 -->
      <div
        v-if="index === 1"
        class="mid"
        :style="{
          'background-image': `url(${icon})`,
          filter:
            props.card[1] === 'JOKER' && ['C', 'S'].includes(props.card[0])
              ? 'grayscale(100%)'
              : 'grayscale(0%)',
        }"
      ></div>

      <!-- 左右 -->
      <div v-else :class="index === 0 ? 'left' : 'right'" :style="cardStyle">
        <div
          :style="{
            'text-align': props.card[1] !== 'JOKER' ? 'center' : 'unset',
          }"
        >
          {{ props.card[1] }}
        </div>
        <div
          v-if="props.card[1] !== 'JOKER'"
          class="icon"
          :style="{ 'background-image': `url(${icon})` }"
        ></div>
      </div>
    </template>
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
    type: Array,
    default: () => {
      return [];
    },
  },
});

// ● emits
const emits = defineEmits(['click']);

const icon = computed(() => {
  const name = props.card[1] === 'JOKER' ? props.card[1] : props.card[0];
  const url = `./assets/${name}.png`;
  const modules = import.meta.glob('./assets/*', { eager: true });
  const mod = modules[url] as { default: string };
  return mod.default;
});

const cardStyle = computed(() => {
  return {
    color: ['H', 'D'].includes(props.card[0]) ? '#c02a1c' : 'black',
    'writing-mode': props.card[1] === 'JOKER' ? 'vertical-rl' : 'unset',
    'text-orientation': props.card[1] === 'JOKER' ? 'upright' : 'unset',
    'letter-spacing': props.card[1] === 'JOKER' ? '-2px' : 'unset',
    'font-size': props.card[1] === 'JOKER' ? '14px' : '18px',
  };
});
</script>

<style lang="scss" src="./index.scss" scoped></style>
