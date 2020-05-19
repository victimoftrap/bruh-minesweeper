<template>
  <main class="minesweeper">
    <h1 class="minesweeper__title">
      Minesweeper
    </h1>

    <section class="minesweeper__game-content">
      <level-select/>
      <playground/>
    </section>
  </main>
</template>

<script>
import LevelSelect from './components/level/LevelSelect.vue';
import Playground from './components/playground/Playground.vue';

export default {
  name: 'MinesweeperApp',
  components: {
    Playground,
    LevelSelect,
  },
};
</script>

<style lang="css">
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  }

  .minesweeper {
    display: flex;
    flex-direction: column;
  }

  .minesweeper__title {
    text-align: center;
    color: #2c3e50;
    font-family: Helvetica, sans-serif;
    margin: 30px 0 40px;
    text-decoration: underline;
  }

  .minesweeper__game-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
</style>
