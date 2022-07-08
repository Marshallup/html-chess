<template>
  <div class="home">
    <div class="flex pt-10 pb-10 min-h-screen justify-center items-center">
      <div>
        <div>
          <div class="justify-between text-3xl flex">
            <div>
              Белые: {{ getAllScoreByPlayerName('player1') }}
            </div>
            <div class="flex">
              <div class="mr-2">
                Текущий ход:
              </div>
              <div>
                {{ PlayerName }}
              </div>
            </div>
            <div>
              Черные: {{ getAllScoreByPlayerName('player2') }}
            </div>
          </div>
        </div>
        <div class="pt-10 pb-10">
          <TheBoardVue
            ref="boardRef"
            :current-player="currentPlayer"
            @change-player="changePlayer"
            @cut-figure="updateScore"
          />
        </div>
        <div>
          <button
            @click="resetGame"
            class="border-solid border-black block border-2"
          >
            Начать заного
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  unref,
  computed,
  reactive,
} from 'vue';
import TheBoardVue from '@/components/TheBoard.vue';
import { Player, Score } from '@/services/board/types';
import { FigureType } from '@/services/figure/types';

interface UpdateScore {
  isFirstPlayer: boolean,
  typeFigure: FigureType,
}

const boardRef = ref<InstanceType<typeof TheBoardVue> | null>(null);
const currentPlayer = ref<Player>('player1');
const score = reactive<Score>({
  player1: [],
  player2: [],
});
const PlayerName = computed(() => {
  switch (unref(currentPlayer)) {
    case 'player1':
      return 'Белые';
    default:
      return 'Чёрные';
  }
});

function updateScore({ isFirstPlayer, typeFigure }: UpdateScore) {
  const playerKey: keyof Score = isFirstPlayer ? 'player1' : 'player2';
  const figureCutInfo = score[playerKey].find((info) => info.figure === typeFigure);

  if (figureCutInfo) {
    figureCutInfo.score += 1;
  } else {
    score[playerKey].push({
      figure: typeFigure,
      score: 1,
    });
  }
}
function getAllScoreByPlayerName(name: keyof Score) {
  return score[name].reduce((prevInfo, curInfo) => prevInfo + curInfo.score, 0);
}

function changePlayer(player: Player) {
  currentPlayer.value = player;
}

function resetGame() {
  if (boardRef.value) {
    boardRef.value.resetBoard();
    currentPlayer.value = 'player1';
    score.player1 = [];
    score.player2 = [];
  }
}
</script>
