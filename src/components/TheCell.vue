<template>
  <div
    :class="cellTypeClass"
    class="cell w-cell-size h-cell-size flex justify-center items-center"
    @click="onClickFigure"
    @keydown="onClickFigure"
  >
    <div
      v-if="props.isCanMove"
      :class="`cell-available-move
      absolute left-1/2 top-1/2 rounded-full bg-red-500 w-5 h-5 transform-cpu
      -translate-x-1/2 -translate-y-1/2`"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

interface TheCellProps {
  isEven?: boolean,
  isCanMove?: boolean,
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
/* .cell {
  &-available {
    &-move {}
  }
} */
</style>
