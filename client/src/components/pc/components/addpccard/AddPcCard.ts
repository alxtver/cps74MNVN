import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import ColorPicker from '@/components/colorpicker/ColorPicker.vue';
import { State } from 'vuex-class';
import Part from '@/models/Part';
import Pc from '@/models/Pc';
import pcApi from '@/api/PcApi';
import PcTable from '@/components/pc/components/pctable/PcTable.vue';
import PcTableTS from '@/components/pc/components/pctable/PcTable';

@Component({ components: { ColorPicker, PcTable } })
export default class AddPcCard extends Vue {
    @Prop({ default: () => new Pc() })
    private pc!: Pc;

    @Prop({ default: () => [] })
    private serialNumbers!: string[];

    @Prop({ default: true })
    private isNewPc!: boolean;

    private valid = true;

    @Ref('pcTable')
    private pcTable!: PcTableTS;

    @State((state) => state.part)
    private part!: Part;

    @Watch('part')
    private changePart(): void {
        this.pc.part = this.part;
    }

    private fdsiRules = [(v) => !!v || 'Введите ФДШИ'];
    private serialNumberRules = [(v) => !!v || 'Введите серийный номер'];

    public resetValidation(): void {
        const form = this.$refs.form as any;
        if (form) {
            form.resetValidation();
        }
    }

    private mounted(): void {
        this.pc.part = this.part;
    }
    /**
     * Добавить строку
     * @private
     */
    private addRow(): void {
        this.pcTable.addRow();
    }

    /**
     * Удалить строку
     * @private
     */
    private removeRow(): void {
        this.pcTable.removeRow();
    }

    /**
     * Сохранить системный блок
     * @private
     */
    private async save(): Promise<void> {
        if (!this.isNewPc) {
            this.$emit('savePc', this.pc);
            return;
        }
        await this.validation();
        if (!this.valid) {
            return;
        }
        if (this.serialNumbers.includes(this.pc.serial_number)) {
            this.$message.error('Неуникальный серийный номер!');
            return;
        }
        const newPc = await pcApi.addPc(this.pc);
        this.$emit('close');
        this.$emit('savePc', newPc);
    }

    /**
     * Валидация формы
     * @private
     */
    private validation(): void {
        const form = this.$refs.form as any;
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
        return `background: ${this.pc.back_color}`;
    }
}
