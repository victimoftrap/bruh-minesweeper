<template>
  <div class="mines-counter">
    <p class="mines-counter__counter">
      Mines {{ cellsFlagged }} / {{ levelMines }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MinesCounter',
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
  .mines-counter {
    text-align: center;
  }
</style>
