<template>
  <div class="TsDemo">
    <h1>TsDemo</h1>
  </div>
</template>

<script setup lang="ts">
import { O } from 'ts-toolbelt';

type TTest = {
  a1: string;
  a2: number;
  a3: {
    a31: string;
    a32: number;
    a33: {
      a331: string;
      a332: number;
    };
  };
};

// type test1 = O.Partial<TTest, 'deep'>
const b: O.Partial<TTest, 'deep'> = {
  a1: '1',
  a3: {
    a31: '1',
    a33: {
      a331: '1',
    },
  },
};
</script>
