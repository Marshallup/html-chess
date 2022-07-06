<template>
  <div
    @click="onClickFigure"
    @keydown="onClickFigure"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

interface ChessItemWrapEmits {
  (event: 'clickChess'): void,
}

const emits = defineEmits<ChessItemWrapEmits>();

function onClickFigure() {
  emits('clickChess');
}
</script>

<style scoped>

</style>
