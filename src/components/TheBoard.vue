<template>
    <div class="w-board-size flex items-center flex-wrap">
        <TheCellVue
            v-for="(cell, cellID, cellIdx) in boardData"
            :key="cellID"
            :is-even="isFillCell(cellIdx)"
            class="relative"
            @click-chess="handleCellClick(cellID as string)"
        >
            <div
              v-if="isWordCell(cellIdx)"
              class="bottom-0 right-0 p-2 text-3xl font-bold absolute"
            >
              {{ getWordCell(cellIdx) }}
            </div>
            <div
              v-if="isNumberCell(cellIdx)"
              class="absolute font-bold text-3xl p-2 left-0 top-0"
            >
              {{ getNumberCell(cellIdx) }}
            </div>
            <div
              v-if="cell.figure"
              class="w-full flex items-center justify-center h-full"
              :class="cell.figure.isWhite ? 'text-white' : ''"
            >
              <TheRookVue v-if="cell.figure.type === 'rook'" />
              <TheQueenVue v-if="cell.figure.type === 'queen'" />
              <TheBishopVue v-if="cell.figure.type === 'bishop'" />
              <TheKnightVue v-if="cell.figure.type === 'knight'" />
              <TheKingVue v-if="cell.figure.type === 'king'" />
              <ThePawnVue v-if="cell.figure.type === 'pawn'" />
            </div>
        </TheCellVue>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from 'vue';
import TheKnightVue from '@/components/ChessIcons/TheKnight.vue';
import TheRookVue from '@/components/ChessIcons/TheRook.vue';
import TheBishopVue from '@/components/ChessIcons/TheBishop.vue';
import TheQueenVue from '@/components/ChessIcons/TheQueen.vue';
import TheKingVue from '@/components/ChessIcons/TheKing.vue';
import TheCellVue from '@/components/TheCell.vue';
import ThePawnVue from '@/components/ChessIcons/ThePawn.vue';
import {
  createBoardData,
  isFillCell,
  isWordCell,
  getWordCell,
  isNumberCell,
  getNumberCell,
} from '@/services/board/board.service';

const boardData = reactive(createBoardData());
// const isCanMoveFigure = ref(true);
const isWhitePlayer = ref(true);
const activeCellID = ref<null | string>(null);

function changeCurrentUser() {
  isWhitePlayer.value = !unref(isWhitePlayer);
}
function isCurrentUser(isWhite: boolean) {
  if (isWhite && unref(isWhitePlayer)) {
    return true;
  }
  if (!isWhite && !unref(isWhitePlayer)) {
    return true;
  }

  return false;
}
function moveFigure(fromCellKey: string, toCellKey: string) {
  boardData[toCellKey].figure = boardData[fromCellKey].figure;
  boardData[fromCellKey].figure = false;
  activeCellID.value = null;
  changeCurrentUser();
}
function handleCellClick(key: string) {
  const cell = boardData[key];
  const activeCell = unref(activeCellID);
  const { figure } = cell;

  if (figure) {
    const isPlayerCanMoveFigure = isCurrentUser(figure.isWhite);

    if (!isPlayerCanMoveFigure) {
      return;
    }

    if (!activeCell) {
      activeCellID.value = key;
      figure.isActive = true;
    } else if (activeCell === key) {
      activeCellID.value = null;
      figure.isActive = false;
    }
  } else if (activeCell) {
    moveFigure(activeCell, key);
  }

  console.log('move handle');
}

console.log(boardData, 'board');

</script>

<style lang="scss" scoped>
</style>
