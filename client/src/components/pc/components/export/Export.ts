import { Component, Vue } from 'vue-property-decorator';
import ExportForm from '@/components/pc/components/export/exportform/ExportForm.vue';

@Component({ components: { ExportForm } })
export default class Export extends Vue {
	private dialog = false;
}
