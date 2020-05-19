<template>
  <section
    class="playground"
    v-show="battlefieldArray.length !== 0"
  >
    <div class="playground__battlefield battlefield">
      <div
        class="battlefield__row"
        v-for="row in battlefieldArray"
        v-bind:key="row"
      >
        <battlefield-cell
          class="battlefield__cell"
          v-for="cell in row"
          v-bind:key="cell"
          v-bind:cell="cell"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import BattlefieldCell from './BattlefieldCell.vue';

export default {
  name: 'Playground',
  components: {
    BattlefieldCell,
  },
  computed: {
    ...mapState({
      battlefieldArray: (state) => state.game.battlefieldArray,
    }),
  },
};
</script>

<style lang="css" scoped>
  .playground {
    margin: 30px auto 0;
  }

  .playground__battlefield {
    margin: 0 auto;
    padding: 10px;
  }

  .battlefield {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #d7d6d2;
    border: 1px solid #2c3e50;
  }

  .battlefield__row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
