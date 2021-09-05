import {Component, Vue} from "vue-property-decorator";

@Component
export default class ExportForm extends Vue {

	private currentCompany = 'ЦПС'
	private companies = ['ЦПС', 'АВК']

	private currentDocument = 'Паспорт'
	private documents = ['Паспорт', 'Системный блок ЗИП', 'ЗИП этикетка']

	/**
	 * Закрыть
	 * @private
	 */
	private chancel(): void {
		this.$emit('close');
	}

	private doExport(): void {
		this.$emit('export');
	}
}
