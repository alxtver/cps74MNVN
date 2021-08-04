import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MainMenu from './components/menu/MainMenu.vue';

@Component({ components: { MainMenu } })
export default class App extends Vue {}
