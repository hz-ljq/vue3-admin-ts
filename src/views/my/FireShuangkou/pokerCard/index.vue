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
            props.card[1] === 'joker' ? 'grayscale(100%)' : 'grayscale(0%)',
        }"
      ></div>

      <!-- 左右 -->
      <div v-else :class="index === 0 ? 'left' : 'right'" :style="cardStyle">
        <div
          :style="{
            'text-align': ['joker', 'JOKER'].includes(props.card[1])
              ? 'unset'
              : 'center',
          }"
        >
          <!-- toUpperCase，是专门给joker用的 -->
          {{ props.card[1].toUpperCase() }}
        </div>
        <div
          v-if="!['joker', 'JOKER'].includes(props.card[1])"
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
  const name = ['joker', 'JOKER'].includes(props.card[1])
    ? props.card[1].toUpperCase()
    : props.card[0];
  const url = `./assets/${name}.png`;
  const modules = import.meta.glob('./assets/*', { eager: true });
  const mod = modules[url] as { default: string };
  return mod.default;
});

const cardStyle = computed(() => {
  return {
    color:
      ['H', 'D'].includes(props.card[0]) || props.card[1] === 'JOKER'
        ? '#c02a1c'
        : 'black',
    'writing-mode': ['joker', 'JOKER'].includes(props.card[1])
      ? 'vertical-rl'
      : 'unset',
    'text-orientation': ['joker', 'JOKER'].includes(props.card[1])
      ? 'upright'
      : 'unset',
    'letter-spacing': ['joker', 'JOKER'].includes(props.card[1])
      ? '-2px'
      : 'unset',
    'font-size': ['joker', 'JOKER'].includes(props.card[1]) ? '14px' : '18px',
  };
});
</script>

<style lang="scss" src="./index.scss" scoped></style>
