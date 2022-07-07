<template>
    <div class="w-board-size flex items-center flex-wrap">
        <TheCellVue
            v-for="(cell, cellID, cellIdx) in boardData"
            :key="cellID"
            :is-even="isFillCell(cellIdx)"
            :is-can-move="getIsAvailableCell(availableMoveCells, cellID as string)"
            class="relative"
            :class="getCursorPointerCell(cell.figure, cellID as string)"
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
import {
  reactive,
  ref,
  computed,
  unref,
  defineProps,
  defineEmits,
} from 'vue';
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
  getAvaiableCells,
  getIsAvailableCell,
} from '@/services/board/board.service';
import { BoardCell, Player } from '@/services/board/types';

interface TheBoardProps {
  currentPlayer: Player,
}
interface TheBoardEmits {
  (event: 'changePlayer', val: Player): void,
}

const props = defineProps<TheBoardProps>();
const emits = defineEmits<TheBoardEmits>();
const boardData = reactive(createBoardData());
const isFirstPlayer = computed({
  get: () => props.currentPlayer === 'player1',
  set: (val) => emits('changePlayer', val ? 'player1' : 'player2'),
});
const activeCellID = ref<null | string>(null);
const availableMoveCells = ref<string[]>([]);

function clearAvaiableMoveCell() {
  availableMoveCells.value = [];
}
function changeCurrentUser() {
  isFirstPlayer.value = !unref(isFirstPlayer);
}
function isCurrentUser(isWhite: boolean) {
  if (isWhite && unref(isFirstPlayer)) {
    return true;
  }
  if (!isWhite && !unref(isFirstPlayer)) {
    return true;
  }

  return false;
}
function moveFigure(fromCellKey: string, toCellKey: string) {
  const figureData = boardData[fromCellKey].figure;

  if (figureData) {
    figureData.isFirstMove = false;
    boardData[toCellKey].figure = figureData;
    boardData[fromCellKey].figure = false;
    activeCellID.value = null;
    changeCurrentUser();
    clearAvaiableMoveCell();
  }
}
function getCursorPointerCell(figure: BoardCell['figure'], cellID: string): 'cursor-pointer' | '' {
  if (figure) {
    if (!unref(activeCellID) && figure.isWhite === unref(isFirstPlayer)) {
      return 'cursor-pointer';
    }
    if (unref(activeCellID) === cellID) {
      return 'cursor-pointer';
    }
  }

  if (getIsAvailableCell(unref(availableMoveCells), cellID)) {
    return 'cursor-pointer';
  }

  return '';
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
      availableMoveCells.value = getAvaiableCells(
        figure.type,
        figure.isFirstMove,
        key,
        unref(isFirstPlayer),
      );
    } else if (activeCell === key) {
      activeCellID.value = null;
      figure.isActive = false;
      availableMoveCells.value = [];
    }
  } else if (activeCell && getIsAvailableCell(unref(availableMoveCells), key)) {
    moveFigure(activeCell, key);
  }
}

</script>

<style lang="scss" scoped>
</style>
