<template>
  <div class="w-board-size flex items-center flex-wrap">
    <TheCellVue
      v-for="(cell, cellID, cellIdx) in boardData"
      :key="cellID"
      :is-even="isFillCell(cellIdx)"
      :is-can-move="getIsAvailableCell(availableMoveCells, cellID as string)"
      :is-cut-cell="getIsAvailableCell(cutDownFigures, cellID as string)"
      :is-active="activeCellID === cellID"
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
  ref,
  computed,
  unref,
  defineProps,
  defineEmits,
  defineExpose,
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
} from '@/services/board';
import { BoardCell, Player } from '@/services/board/types';
import { FigureType } from '@/services/figure/types';

interface TheBoardProps {
  currentPlayer: Player,
}
interface CutFigureEmitVal {
  isFirstPlayer: boolean,
  typeFigure: FigureType,
}
interface TheBoardEmits {
  (event: 'changePlayer', val: Player): void,
  (event: 'cutFigure', val: CutFigureEmitVal): void,
}

const props = defineProps<TheBoardProps>();
const emits = defineEmits<TheBoardEmits>();
const boardData = ref(createBoardData());
const isFirstPlayer = computed({
  get: () => props.currentPlayer === 'player1',
  set: (val) => emits('changePlayer', val ? 'player1' : 'player2'),
});
const activeCellID = ref<null | string>(null);
const availableMoveCells = ref<string[]>([]);
const cutDownFigures = ref<string[]>([]);

function clearAvaiableMoveCell() {
  availableMoveCells.value = [];
}
function clearCutDownFigures() {
  cutDownFigures.value = [];
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
function emitCutFigure(typeFigure: FigureType) {
  emits('cutFigure', {
    isFirstPlayer: unref(isFirstPlayer),
    typeFigure,
  });
}
function moveFigure(fromCellKey: string, toCellKey: string) {
  const figureData = unref(boardData)[fromCellKey].figure;
  const toFigureData = unref(boardData)[toCellKey].figure;

  if (figureData) {
    if (toFigureData) {
      emitCutFigure(toFigureData.type);
    }

    figureData.isFirstMove = false;
    unref(boardData)[toCellKey].figure = figureData;
    unref(boardData)[fromCellKey].figure = false;
    activeCellID.value = null;
    changeCurrentUser();
    clearAvaiableMoveCell();
    clearCutDownFigures();
  }
}
function getCursorPointerCell(figure: BoardCell['figure'], cellID: string): 'cursor-pointer' | '' {
  const pointerClass = 'cursor-pointer';

  if (figure) {
    if (!unref(activeCellID) && figure.isWhite === unref(isFirstPlayer)) {
      return pointerClass;
    }
    if (unref(activeCellID) === cellID) {
      return pointerClass;
    }
  }

  if (getIsAvailableCell(unref(availableMoveCells), cellID)) {
    return pointerClass;
  }

  if (getIsAvailableCell(unref(cutDownFigures), cellID)) {
    return pointerClass;
  }

  return '';
}
function handleCellClick(key: string) {
  const cell = unref(boardData)[key];
  const activeCell = unref(activeCellID);
  const { figure } = cell;
  const isCutCell = getIsAvailableCell(unref(cutDownFigures), key);

  if (!isCutCell && figure) {
    const isPlayerCanMoveFigure = isCurrentUser(figure.isWhite);

    if (!isPlayerCanMoveFigure) {
      return;
    }

    if (!activeCell) {
      activeCellID.value = key;
      figure.isActive = true;

      const cellsData = getAvaiableCells(
        unref(boardData),
        figure.type,
        figure.isFirstMove,
        key,
        unref(isFirstPlayer),
      );

      availableMoveCells.value = cellsData.moveCellsID;
      cutDownFigures.value = cellsData.cutCellsID;
    } else if (activeCell === key) {
      activeCellID.value = null;
      figure.isActive = false;
      clearAvaiableMoveCell();
      clearCutDownFigures();
    }
  } else if (
    activeCell
    && (
      getIsAvailableCell(unref(availableMoveCells), key)
      || isCutCell
    )
  ) {
    moveFigure(activeCell, key);
  }
}

function resetBoard() {
  boardData.value = createBoardData();
  activeCellID.value = null;
  availableMoveCells.value = [];
  cutDownFigures.value = [];
}

defineExpose({
  resetBoard,
});

</script>

<style lang="scss" scoped>
</style>
