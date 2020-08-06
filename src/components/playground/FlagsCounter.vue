<template>
  <div class="flags-counter">
    <p class="flags-counter__text">
      Flags {{ cellsFlagged }} / {{ levelMines }}
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
    }),
  },
};
</script>

<style lang="css" scoped>
  .flags-counter {
    text-align: center;
  }
</style>
