import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import GroupButtons from '@/components/groupbuttons/GroupButtons.vue';
import CopyForm from '@/components/copyform/CopyForm.vue';
import PcTable from '@/components/pc/components/pctable/PcTable.vue';
import Pc from '@/models/Pc';
import CopyFormTS from '@/components/copyform/CopyForm';
import pcApi from '@/api/PcApi';
import EditPc from '@/components/pc/components/editpc/EditPc.vue';
import EditPcTS from '@/components/pc/components/editpc/EditPc';

@Component({ components: { GroupButtons, CopyForm, PcTable, EditPc } })
export default class PcForm extends Vue {
    @Prop()
    private pc!: Pc;

    @Prop({ default: () => [] })
    private serialNumbers!: string[];

    @Ref('editPc')
    private editPcComponent!: EditPcTS;

    @Ref('copyPc')
    private copyPcComponent!: CopyFormTS;

    private openEditDialog = false;

    /**
     * Удалить ПЭВМ
     * @private
     */
    private removePc(): void {
        this.$emit('doRemove', this.pc._id);
    }

    /**
     * Нажатие на кнопку редактировать
     * @private
     */
    private doEdit(): void {
        this.editPcComponent.openDialog();
    }

    private updatePc(oldPc): void {
        this.$emit('updatePc', oldPc);
    }

    /**
     * Нажатие на кнопку копировать
     * @private
     */
    private doCopy(): void {
        this.copyPcComponent.openDialog();
    }

    /**
     * Копирование ПЭВМ
     * @param currentSerialNumber
     * @param firstSerialNumber
     * @param lastSerialNumber
     * @private
     */
    private async copyPc(
        currentSerialNumber: string,
        firstSerialNumber: string,
        lastSerialNumber: string,
    ): Promise<void> {
        const newPc: Pc[] = await pcApi.copyPc(
            currentSerialNumber,
            firstSerialNumber,
            lastSerialNumber,
        );
        this.$emit('addPc', newPc);
    }

    private get pcColor(): string {
        if (this.pc) {
            return `background: ${this.pc.back_color}; border-radius: 4px;`;
        }
        return '';
    }


	/**
	 * Сохранить измененный ПЭВМ
	 * @param pc
	 * @private
	 */
	private editPc(pc): void {
		pcApi
			.editPc(pc)
			.then(() => this.editPcComponent.closeDialog());
	}

    private closeEditDialog(): void {
        this.openEditDialog = false;
    }
}
