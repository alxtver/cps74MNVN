import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import SystemCase from "@/models/SystemCase";

@Component
export default class ColorPicker extends Vue {
	@Prop()
	private systemCase!: SystemCase;

	private swatches = [
		['#618bd6'],
		['#61d663'],
		['#d6616b'],
		['#d6d561'],
		['#d661ba'],
	]

	// private changeColor(color): void {
	// 	this.systemCase
	// }
}
