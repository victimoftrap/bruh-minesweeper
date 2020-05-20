<template>
  <div
    class="cell"
    v-on:click.left.exact="onLeftClick"
    v-on:click.right="onRightClick"
    v-on:contextmenu.prevent=""
  >
    <h1
      class="cell__mark"
      v-bind:class="{'cell__opened': cell.state === 'OPENED'}"
    >
      {{ this.cellMarker() }}
    </h1>
  </div>
</template>

<script>
import CellState from '../../engine/models/cell/CellState';

export default {
  name: 'BattlefieldCell',
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      nothing: '',
      mine: String.fromCodePoint(0x1F4A3),
      flag: String.fromCodePoint(0x1F3F4),
      redFlag: String.fromCodePoint(0x1F6A9),
      explode: String.fromCodePoint(0x1F4A5),
      question: String.fromCodePoint(0x2753),
    };
  },
  methods: {
    cellMarker() {
      const cellState = this.cell.state;
      if (cellState === CellState.EXPLODED) {
        return this.$data.mine;
      }
      if (cellState === CellState.FLAGGED) {
        return this.$data.redFlag;
      }
      if (cellState === CellState.UNKNOWN) {
        return this.$data.question;
      }
      if (this.cell.minesAround === 0 || cellState === CellState.CLOSED) {
        return this.$data.nothing;
      }
      return this.cell.minesAround;
    },

    onLeftClick() {
      this.$store.dispatch('game/openCell', this.cell.point);
    },

    onRightClick() {
      this.$store.dispatch('game/cellRightAction', this.cell.point);
    },
  },
};
</script>

<style lang="css" scoped>
  .cell {
    width: 35px;
    height: 35px;

    color: #2c3e50;
    border: 1px solid #999;
  }

  .cell__mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    margin: 0;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-size: 18px;
  }

  .cell__opened {
    background-color: white;
  }
</style>
