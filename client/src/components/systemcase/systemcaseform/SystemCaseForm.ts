import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import SystemCase from '@/models/SystemCase';
import SystemCaseTable from '@/components/systemcase/systemcasetable/SystemCaseTable.vue';
import SystemCaseTableTs from '@/components/systemcase/systemcasetable/SystemCaseTable';
import GroupButtons from '@/components/groupbuttons/GroupButtons.vue';
import EditSystemCase from '@/components/systemcase/editsystemcase/EditSystemCase.vue';
import EditSystemCaseTS from '@/components/systemcase/editsystemcase/EditSystemCase';
import CopyForm from '@/components/copyform/CopyForm.vue';
import CopyFormTS from '@/components/copyform/CopyForm';
import systemCaseApi from '@/api/SystemCaseApi';
import table from '@/helper/Table';

@Component({
    components: { SystemCaseTable, GroupButtons, EditSystemCase, CopyForm },
})
export default class SystemCaseForm extends Vue {
    @Prop()
    private systemCase!: SystemCase;

    @Prop({ default: () => [] })
    private serialNumbers!: string[];

    private openEditDialog = false;

    @Ref('editSystemCase')
    private editSystemCaseComponent!: EditSystemCaseTS;

    @Ref('copySystemCase')
    private copySystemCaseComponent!: CopyFormTS;

    @Ref('table')
    private table!: SystemCaseTableTs;

    private mounted(): void {
       this.painting();
    }

    public painting(): void {
        table.painting(this.table);
    }

    private updateSystemCase(oldSystemCase): void {
        table.painting(this.table);
        this.$emit('updateSystemCase', oldSystemCase);
    }

    private removeSystemCase(): void {
        this.$emit('doRemove', this.systemCase._id);
    }

    /**
     * Нажатие на кнопку редактировать
     * @private
     */
    private doEdit(): void {
        this.editSystemCaseComponent.openDialog();
    }

    /**
     * Нажатие на кнопку копировать
     * @private
     */
    private doCopy(): void {
        this.copySystemCaseComponent.openDialog();
    }

    /**
     * Сохранить измененный системный блок
     * @param systemCase
     * @private
     */
    private editSystemCase(systemCase): void {
        systemCaseApi
            .editSystemCase(systemCase)
            .then(() => this.editSystemCaseComponent.closeDialog());
    }

    private get systemCaseColor(): string {
        if (this.systemCase) {
            return `background: ${this.systemCase.back_color}; border-radius: 4px;`;
        }
        return '';
    }

    private closeEditDialog(): void {
        this.openEditDialog = false;
    }

    /**
     * Копирование системных блоков
     * @param currentSerialNumber
     * @param firstSerialNumber
     * @param lastSerialNumber
     * @private
     */
    private async copySystemCases(
        currentSerialNumber: string,
        firstSerialNumber: string,
        lastSerialNumber: string,
    ): Promise<void> {
        const systemCases: SystemCase[] = await systemCaseApi.copySystemCase(
            currentSerialNumber,
            firstSerialNumber,
            lastSerialNumber,
        );
        this.$emit('addSystemCases', systemCases);
    }
}
