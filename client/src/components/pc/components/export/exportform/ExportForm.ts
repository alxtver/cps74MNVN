import {Component, Vue} from 'vue-property-decorator';
import {State} from "vuex-class";

@Component
export default class ExportForm extends Vue {
    private currentDocument = 'Паспорт';
    private documents = ['Паспорт', 'Системный блок ЗИП', 'ЗИП этикетка'];
    private firstPc = '';
    private lastPc = '';

	@State((state) => state.pcSerialNumbers)
	private pcSerialNumbers!: string;

	private mounted(): void {
		this.firstPc = this.pcSerialNumbers[0];
		this.lastPc = this.pcSerialNumbers[this.pcSerialNumbers.length - 1];
	}

    /**
     * Закрыть
     * @private
     */
    private chancel(): void {
        this.$emit('close');
    }

    private doExport(): void {
		this.$emit('exportDoc', this.firstPc, this.lastPc, this.currentDocument);
    }

	private onChangeFirstPc(value: string): void {
		const firstIndex = this.pcSerialNumbers.indexOf(value);
		const lastIndex = this.pcSerialNumbers.indexOf(this.lastPc);
		if (lastIndex < firstIndex) {
			this.lastPc = this.firstPc
		}
	}

	private onChangeLastPc(value: string): void {
		const lastIndex = this.pcSerialNumbers.indexOf(value);
		const firstIndex = this.pcSerialNumbers.indexOf(this.firstPc);
		if (lastIndex < firstIndex) {
			this.firstPc = this.lastPc
		}
	}
}
