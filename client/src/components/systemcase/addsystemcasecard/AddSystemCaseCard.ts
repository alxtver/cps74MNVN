import {Component, Prop, Ref, Vue, Watch} from 'vue-property-decorator';
import SystemCaseTable from '@/components/systemcase/systemcasetable/SystemCaseTable.vue';
import SystemCaseTableTS from '@/components/systemcase/systemcasetable/SystemCaseTable';
import SystemCase from '@/models/SystemCase';
import ColorPicker from '@/components/colorpicker/ColorPicker.vue';
import { State } from 'vuex-class';
import Part from '@/models/Part';
import systemCaseApi from '@/api/SystemCaseApi';

@Component({ components: { SystemCaseTable, ColorPicker } })
export default class AddSystemCaseCard extends Vue {
    @Prop({ default: () => new SystemCase() })
    private systemCase!: SystemCase;

    @Prop({ default: () => [] })
    private serialNumbers!: string[];

    @Prop({default: true})
    private isNewSystemCase!: boolean;

    private valid = true;

    @Ref('systemCaseTable')
    private systemCaseTable!: SystemCaseTableTS;

    @State((state) => state.part)
    private part!: Part;

    @Watch('part')
    private changePart(): void {
        this.systemCase.part = this.part;
    }

    private fdsiRules = [(v) => !!v || 'Введите ФДШИ'];
    private serialNumberRules = [(v) => !!v || 'Введите серийный номер'];

    public resetValidation(): void {
        const form = this.$refs.form as Vue & {
            resetValidation: () => boolean;
        };
        if (form) {
            form.resetValidation();
        }
    }

    private mounted(): void {
        this.systemCase.part = this.part;
    }
    /**
     * Добавить строку
     * @private
     */
    private addRow(): void {
        this.systemCaseTable.addRow();
    }

    /**
     * Удалить строку
     * @private
     */
    private removeRow(): void {
        this.systemCaseTable.removeRow();
    }

    /**
     * Сохранить системный блок
     * @private
     */
    private async save(): Promise<void> {
        if (!this.isNewSystemCase) {
            this.$emit('saveSystemCase', this.systemCase);
            return;
        }
        await this.validation();
        if (!this.valid) {
            return;
        }
        if (this.serialNumbers.includes(this.systemCase.serialNumber)) {
            this.$message.error('Неуникальный серийный номер!')
            return;
        }
        const newSystemCase = await systemCaseApi.addSystemCase(
            this.systemCase,
        );
        this.$emit('close');
        this.$emit('saveSystemCase', newSystemCase);
    }

    /**
     * Валидация формы
     * @private
     */
    private validation(): void {
        const form = this.$refs.form as Vue & { validate: () => boolean };
        form.validate();
    }

    /**
     * Отмена сохранения
     * @private
     */
    private chancel(): void {
        this.$emit('close');
    }

    private get backColor(): string {
        return `background: ${this.systemCase.back_color}`;
    }
}
