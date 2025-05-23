<template>
  <div
    class="pokerCard"
    @click="emits('click')"
    :style="{ width: isLastCard ? '100px' : '22px' }"
  >
    <!-- <div class="shadow"></div> -->
    <!-- 正面 -->
    <div
      :class="{
        left: true,
        'used-for-selectable': !isLastCard,
      }"
      :style="cardStyle"
    >
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

    <!-- 中间 -->
    <div
      class="mid"
      :style="{
        'background-image': `url(${icon})`,
        filter: props.card[1] === 'joker' ? 'grayscale(100%)' : 'grayscale(0%)',
      }"
    ></div>

    <!-- 左右 -->
    <div
      :class="{
        right: true,
      }"
      :style="cardStyle"
    >
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

    <transition name="switch">
      <!-- 背面 -->
      <div v-if="!props.card[4]" class="back"></div>
    </transition>
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
  isLastCard: {
    type: Boolean,
    default: () => {
      return true;
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

const cardStyle: any = computed(() => {
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
