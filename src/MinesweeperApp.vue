<template>
  <div id="app">
    <menu-header/>
    <main class="minesweeper">
      <section class="minesweeper__game-content">
        <playground/>
      </section>
    </main>
  </div>
</template>

<script>
import MenuHeader from './components/header/MenuHeader.vue';
import Playground from './components/playground/Playground.vue';

export default {
  name: 'MinesweeperApp',
  components: {
    Playground,
    MenuHeader,
  },
};
</script>

<style lang="css">
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
    font-family: Helvetica, sans-serif;
  }

  .minesweeper {
    display: flex;
    flex-direction: column;
  }

  .minesweeper__game-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
</style>
