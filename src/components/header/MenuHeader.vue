<template>
  <header class="header">
    <h1 class="header__title">BruhMinesweeper</h1>
    <ul class="header__difficulty-select difficulty-select">
      <li
        class="difficulty-select__item"
        v-for="level in allLevels"
        v-bind:key="level.name"
      >
        <button
          class="difficulty-select__button"
          v-bind:class="{
            'difficulty-select__button_pressed': level.name === selectedLevel
          }"
          v-on:click="selectLevelDifficulty"
        >
          {{ level.name }}
        </button>
      </li>
    </ul>
    <ul class="header__mines-generation mines-generation">
      <li
        class="mines-generation__item"
        v-for="minesOpt in minesGenerationOptions"
        v-bind:key="minesOpt.name"
      >
        <button
          class="mines-generation__button"
          v-bind:class="{
            'mines-generation__button_pressed': minesOpt.id === selectedMinesGeneration
          }"
          v-on:click="selectMinesGeneration"
        >
          {{ minesOpt.name }}
        </button>
      </li>
    </ul>
    <button
     class="header__start-button"
     v-on:click="newGame"
    >
     Press to play
   </button>
  </header>
</template>

<script>
export default {
  name: 'MenuHeader',
  data() {
    return {
      allLevels: [
        { name: 'Beginner' },
        { name: 'Intermediate' },
        { name: 'Expert' },
      ],
      selectedLevel: 'Beginner',
      minesGenerationOptions: [
        { id: 'OnStart', name: 'Mines on start' },
        { id: 'OnFirstClick', name: 'Mines on first click' },
      ],
      selectedMinesGeneration: 'OnFirstClick',
    };
  },
  mounted() {
    this.$store.dispatch('game/chooseGameLevel', this.selectedLevel);
    this.$store.dispatch('game/chooseMinesGeneration', this.selectedMinesGeneration);
  },
  methods: {
    selectLevelDifficulty(event) {
      this.selectedLevel = event.target.innerText;
      this.$store.dispatch('game/chooseGameLevel', this.selectedLevel);
    },

    selectMinesGeneration(event) {
      this.selectedMinesGeneration = this.minesGenerationOptions
        .find((opt) => opt.name === event.target.innerText).id;
      this.$store.dispatch('game/chooseMinesGeneration', this.selectedMinesGeneration);
    },

    newGame() {
      this.$store.dispatch('game/startNewGame');
    },
  },
};
</script>

<style lang="css" scoped>
  .header {
    display: flex;
    justify-content: space-around;

    background-color: #3F7FBF;
    padding: 10px 5%;
  }

  .header__title {
    margin: 0 0;
    font-weight: normal;
    color: white;
    letter-spacing: -2px;
  }

  .difficulty-select, .mines-generation {
    margin: 0;
    padding: 0;
    display: flex;
  }

  .difficulty-select__item, .mines-generation__item {
    list-style: none;
    background-color: white;
  }

  .difficulty-select__button, .mines-generation__button {
    height: 100%;
    color: white;
    font-size: 16px;
    border: 1px #3F7FBF solid;
    background-color: #3F7FBF;
  }

  .difficulty-select__button:hover, .mines-generation__button:hover {
    content: '';
    cursor: pointer;
    border: 1px white solid;
  }

  .difficulty-select__button_pressed, .mines-generation__button_pressed {
    color: #2c3e50;
    background-color: white;
    border: 1px white solid;
  }

  .header__start-button {
    border: none;
    color: #2c3e50;
    background-color: white;
    cursor: pointer;
    font-size: 16px;
  }
</style>
