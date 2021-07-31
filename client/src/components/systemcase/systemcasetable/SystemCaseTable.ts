import { Component, Prop, Vue } from 'vue-property-decorator';
import SystemCase from '@/models/SystemCase';
import table from '@/helper/Table';
import { State } from 'vuex-class';
import Unit from '@/models/Unit';
import systemCaseApi from '@/api/SystemCaseApi';

@Component({ components: {} })
export default class SystemCaseTable extends Vue {
    @Prop()
    private systemCase!: SystemCase;

    @State((state) => state.sound)
    private sound!: boolean;

    private selectedRow = -1;

    private headers = [
        {
            text: 'Обозначение изделия',
            sortable: false,
            value: 'fdsi',
            class: 'systemCaseHeader',
        },
        {
            text: 'Наименование изделия',
            value: 'type',
            sortable: false,
            class: 'systemCaseHeader',
        },
        {
            text: 'Характеристика',
            value: 'name',
            sortable: false,
            class: 'systemCaseHeader',
        },
        {
            text: 'Количество',
            value: 'quantity',
            sortable: false,
            class: 'systemCaseHeader',
        },
        {
            text: 'Заводской номер',
            value: 'serial_number',
            sortable: false,
            class: 'systemCaseHeader',
        },
        {
            text: 'Примечания',
            value: 'notes',
            sortable: false,
            class: 'systemCaseHeader',
        },
    ]; // Заголоки таблицы

    /**
     * Изменяем класс строки
     * @param row
     * @private
     */
    private itemClass(row): string {
        return row.i === this.selectedRow ? 'td active' : 'td not-active';
    }

    /**
     * Ввод серийного номера
     * @param props
     * @private
     */
    private async insertSerialNumber(props): Promise<void> {
        const item: Unit = props.item;
        const data = await systemCaseApi.editSerialNumber(
            item,
            this.systemCase._id,
        );
        const find: Unit = this.systemCase.systemCaseUnits.find(
            (systemCaseUnit) => systemCaseUnit.i === item.i,
        );
        Object.assign(find, data);
        props.item.serialNumber = props.value;
        table.goToNextCell(
            this,
            props,
            this.systemCase.systemCaseUnits,
            this.systemCase.serialNumber,
            this.sound,
        );
    }

    /**
     * Редактируемая ли ячейка
     * @param item
     * @private
     */
    private isEditableCell(item): boolean {
        if (item.serial_number === this.systemCase.serialNumber) {
            return false;
        }
        return item.serial_number !== 'б/н';
    }

    /**
     * Открытие ячейки на редактирование
     * @param index
     * @private
     */
    private open(index: number): void {
        this.selectedRow = index;
    }

    /**
     * Отмена редактирования ячейки
     * @private
     */
    private cancel(): void {
        this.selectedRow = -1;
    }

    /**
     * Выбор строки
     * @param row
     * @param event
     * @private
     */
    private onSelectRow(row: Unit, event): void {
        this.selectedRow = event.index;
    }
}
