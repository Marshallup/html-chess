<template>
  <div
    :class="cellTypeClass"
    class="cell"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

interface TheCellProps {
  isEven?: boolean,
}

const props = defineProps<TheCellProps>();
const cellTypeClass = computed(() => {
  let className = 'cell--';

  if (props.isEven) {
    className += 'even';
  } else {
    className += 'odd';
  }

  return className;
});

</script>

<style lang="scss" scoped>
@import '@/assets/styles/vars.scss';
.cell {
  width: $cellSize;
  height: $cellSize;
  &--even {
    background-color: $evenCellColor;
  }
  &--odd {
    background-color: $oddCellColor;
  }
}
</style>
