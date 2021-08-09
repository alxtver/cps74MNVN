import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import SystemCase from '@/models/SystemCase';
import SystemCaseTable from '@/components/systemcase/systemcasetable/SystemCaseTable.vue';
import GroupButtons from '@/components/groupbuttons/GroupButtons.vue';
import EditSystemCase from '@/components/systemcase/editsystemcase/EditSystemCase.vue';
import EditSystemCaseTS from '@/components/systemcase/editsystemcase/EditSystemCase';
import systemCaseApi from '@/api/SystemCaseApi';

@Component({ components: { SystemCaseTable, GroupButtons, EditSystemCase } })
export default class SystemCaseForm extends Vue {
    @Prop()
    private systemCase!: SystemCase;

    private openEditDialog = false;

    @Ref('editSystemCase')
    private editSystemCaseComponent!: EditSystemCaseTS;

    private updateSystemCase(oldSystemCase): void {
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
        return `background: ${this.systemCase.back_color}; border-radius: 4px;`;
    }

    private closeEditDialog(): void {
        this.openEditDialog = false;
    }
}
