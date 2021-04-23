<template>
  <div class="flags-counter">
    <p class="flags-counter__text">
      Flags {{ cellsFlagged }} / {{ levelMines }}
    </p>
    <p class="flags-counter__description">
      {{ gameDescription() }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FlagsCounter',
  computed: {
    ...mapState({
      cellsFlagged: (state) => state.game.game.cellsFlagged,
      minesFlagged: (state) => state.game.game.minesFlagged,
      levelMines: (state) => state.game.game.level.mines,
      gameState: (state) => state.game.game.state,
    }),
  },
  methods: {
    gameDescription() {
      if (this.gameState === 'WIN') {
        return `Congratulations! ${String.fromCodePoint(0x1F60E)}`;
      }
      if (this.gameState === 'LOSE') {
        return `Better luck next time ${String.fromCodePoint(0x1F61E)}`;
      }
      return `Let's try ${String.fromCodePoint(0x1F920)}`;
    },
  },
};
</script>

<style lang="css" scoped>
  .flags-counter {
    text-align: center;
  }
</style>
