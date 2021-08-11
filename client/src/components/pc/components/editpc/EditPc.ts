import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import AddPcCard from '@/components/pc/components/addpccard/AddPcCard.vue';
import AddPcCardTS from '@/components/pc/components/addpccard/AddPcCard';
import Pc from "@/models/Pc";

@Component({ components: { AddPcCard } })
export default class EditPc extends Vue {
	@Prop({ default: () => [] })
	private serialNumbers!: string[];

	@Prop()
	private pc!: Pc;

	private dialog = false;

	@Ref('addPcCard')
	private addPcCard!: AddPcCardTS;

	/**
	 * Редактировать ПЭВМ
	 * @param pc
	 * @private
	 */
	private editPc(pc): void {
		this.$emit('editPc', pc);
	}

	public closeDialog(): void {
		this.dialog = false;
	}

	public openDialog(): void {
		this.dialog = true;
	}
}
