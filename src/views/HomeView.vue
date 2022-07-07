<template>
  <div class="home">
    <div class="flex pt-10 pb-10 min-h-screen justify-center items-center">
      <div>
        <div>
          <div class="justify-center text-3xl flex">
            <div class="mr-2">
              Текущий ход:
            </div>
            <div>
              {{ PlayerName }}
            </div>
          </div>
        </div>
        <div class="pt-10 pb-10">
          <TheBoardVue
            :current-player="currentPlayer"
            @change-player="changePlayer"
          />
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
} from 'vue';
import TheBoardVue from '@/components/TheBoard.vue';
import { Player } from '@/services/board/types';

const currentPlayer = ref<Player>('player1');
const PlayerName = computed(() => {
  switch (unref(currentPlayer)) {
    case 'player1':
      return 'Белые';
    default:
      return 'Чёрные';
  }
});

function changePlayer(player: Player) {
  currentPlayer.value = player;
}
</script>
