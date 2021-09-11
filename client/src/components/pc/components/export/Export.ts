import { Component, Vue } from 'vue-property-decorator';
import ExportForm from '@/components/pc/components/export/exportform/ExportForm.vue';

@Component({ components: { ExportForm } })
export default class Export extends Vue {
	private dialog = false;

	private exportDoc(firstPc: string, lastPc: string, currentDocument: string): void {
		this.$emit('exportDoc', firstPc, lastPc, currentDocument);
	}
}
