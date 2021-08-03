import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import SystemCaseTable from '@/components/systemcase/systemcasetable/SystemCaseTable.vue';
import SystemCaseTableTS from '@/components/systemcase/systemcasetable/SystemCaseTable';
import SystemCase from "@/models/SystemCase";
import ColorPicker from "@/components/colorpicker/ColorPicker.vue";
import {State} from "vuex-class";
import Part from "@/models/Part";

@Component({ components: { SystemCaseTable, ColorPicker } })
export default class AddSystemCaseCard extends Vue {
    private valid = true;

    @Prop({default: () => new SystemCase()})
    private systemCase!: SystemCase;

    @Ref('systemCaseTable')
    private systemCaseTable!: SystemCaseTableTS;

    @State((state) => state.part)
    private part!: Part;

    private mounted(): void {
        this.systemCase.part = this.part;
    }
    /**
     * Добавить строку
     * @private
     */
    private addRow(): void {
        this.systemCaseTable.addRow()
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
    private save(): void {
        debugger;
    }

    /**
     * Отмена сохранения
     * @private
     */
    private chancel(): void {
        this.$emit('chancel');
    }
}
