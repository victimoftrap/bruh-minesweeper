import Vue from 'vue';
import MinesweeperApp from './MinesweeperApp.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(MinesweeperApp),
})
  .$mount('#app');
