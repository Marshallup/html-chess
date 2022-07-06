<template>
  <div
    :class="cellTypeClass"
    class="cell w-cell-size h-cell-size flex justify-center items-center"
    @click="onClickFigure"
    @keydown="onClickFigure"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

interface TheCellProps {
  isEven?: boolean,
}

interface ChessItemWrapEmits {
  (event: 'clickChess'): void,
}

const emits = defineEmits<ChessItemWrapEmits>();
const props = defineProps<TheCellProps>();
const cellTypeClass = computed(() => {
  if (props.isEven) {
    return 'bg-event-color';
  }

  return 'bg-odd-color';
});

function onClickFigure() {
  emits('clickChess');
}

</script>

<style lang="scss" scoped>

</style>
