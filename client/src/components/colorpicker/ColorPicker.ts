import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class ColorPicker extends Vue {
	private swatches = [
		['#618bd6'],
		['#61d663'],
		['#d6616b'],
		['#d6d561'],
		['#d661ba'],
	]
}
