import Vue from 'vue';
import App from './templates/app';

const vm = new Vue({
  el: '#app-container',
  render: h => h(App)
});