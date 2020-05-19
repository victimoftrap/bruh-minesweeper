<template>
  <div class="level-select">
    <label class="level-select__available-options" for="minesweeper-level">
      <span class="level-select__title">
        Select game level
      </span>

      <select
        id="minesweeper-level"
        class="level-select__options-picker"
        v-on:change="applyLevel"
      >
        <option
          v-for="level in levelsArray"
          v-bind:key="level.name"
        >
          {{ level.name }}
        </option>
      </select>
    </label>

    <button
      class="level-select__apply-button"
      v-on:click="startNewGame"
    >
      Start game
    </button>
  </div>
</template>

<script>
export default {
  name: 'LevelSelect',
  data() {
    return {
      selectedLevelName: 'beginner',
      levelsArray: [
        { name: 'beginner' },
        { name: 'intermediate' },
        { name: 'expert' },
      ],
    };
  },
  methods: {
    applyLevel(event) {
      this.selectedLevelName = event.target.value;
    },

    startNewGame() {
      this.$store.dispatch('game/startNewGame', this.selectedLevelName);
    },
  },
};
</script>

<style lang="css" scoped>
  .level-select {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 0 auto;

    color: #2c3e50;
  }

  .level-select__available-options {
    font-size: 15px;
    font-family: Helvetica, sans-serif;
  }

  .level-select__title {
    width: 100%;
    display: inline-block;
    margin-bottom: 5px;

    text-align: center;
  }

  .level-select__options-picker {
    width: 200px;
    padding: 5px;
    margin: 0 auto 27px;

    border: 1px solid #999;
    background-color: white;
  }

  .level-select__apply-button {
    padding: 5px;

    background-color: white;
    border: 1px #999 solid;
  }
</style>
