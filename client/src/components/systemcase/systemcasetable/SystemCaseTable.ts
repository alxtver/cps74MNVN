import { Component, Prop, Vue } from 'vue-property-decorator';
import SystemCase from '@/models/SystemCase';
import table from '@/helper/Table';
import { State } from 'vuex-class';
import Unit from '@/models/Unit';
import systemCaseApi from '@/api/SystemCaseApi';
import alex from '@/helper/Alex';

@Component({ components: {} })
export default class SystemCaseTable extends Vue {
    @Prop()
    private systemCase!: SystemCase;

    @Prop({ default: false })
    private editSystemCase!: boolean;

    @State((state) => state.sound)
    private sound!: boolean;

    private selectedRow = -1;

    private selected = [];

    private headers = [
        {
            text: 'Обозначение изделия',
            sortable: false,
            value: 'fdsi',
        },
        {
            text: 'Наименование изделия',
            value: 'type',
            sortable: false,
        },
        {
            text: 'Характеристика',
            value: 'name',
            sortable: false,
        },
        {
            text: 'Количество',
            value: 'quantity',
            sortable: false,
        },
        {
            text: 'Заводской номер',
            value: 'serial_number',
            sortable: false,
        },
        {
            text: 'Примечания',
            value: 'notes',
            sortable: false,
        },
    ]; // Заголоки таблицы

    private headersForAssembly = [
        {
            text: 'Наименование изделия',
            value: 'type',
            sortable: false,
        },
        {
            text: 'Характеристика',
            value: 'name',
            sortable: false,
        },
        {
            text: 'Количество',
            value: 'quantity',
            sortable: false,
        },
        {
            text: 'Заводской номер',
            value: 'serial_number',
            sortable: false,
        },
    ]; // Заголоки таблицы для сборки

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
        // Таблица используется еще и для добавления и редактирования
        // системного блока по этому если редактируем или создаем системный
        // блок то при вводе серийного номера ничего не отправляем
        if (this.editSystemCase) {
            return;
        }
        const item: Unit = props.item;
        const data = await systemCaseApi.editSerialNumber(
            item,
            this.systemCase._id,
        );
        if (data.oldSystemCase) {
            this.$emit('updateSystemCase', data.oldSystemCase);
        }
        const find: Unit = this.systemCase.systemCaseUnits.find(
            (systemCaseUnit) => systemCaseUnit.i === item.i,
        );
        Object.assign(find, data.editableUnit);
        if (data.editableUnit.name === 'Н/Д') {
            alex.alert();
            this.$message.error('Не найден серийный номер!');
        }
        if (data.message) {
            alex.alert();
            this.$message.error(data.message);
        }
        props.item.serialNumber = props.value;
        table.goToNextCell(
            this,
            props,
            this.systemCase.systemCaseUnits,
            this.systemCase.serialNumber,
            this.sound,
            this.$route.path === '/SystemCases'
        );
    }

    /**
     * Редактируемая ли ячейка
     * @param item
     * @private
     */
    private isEditableCell(item): boolean {
        if (this.editSystemCase) {
            return true;
        }
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

    /**
     * Добавить строку
     */
    public addRow(): void {
        if (this.selected.length === 0) {
            return;
        }
        const units = this.systemCase.systemCaseUnits;
        for (const item of this.selected) {
            units.splice(units.indexOf(item) + 1, 0, new Unit())
        }
        this.correctIndexes();
        this.selected = [];
    }

    /**
     * Удалить строку
     */
    public removeRow(): void {
        if (this.selected.length === 0) {
            return;
        }
        const units = this.systemCase.systemCaseUnits;
        for (const item of this.selected) {
            units.splice(units.indexOf(item), 1)
        }
        this.correctIndexes();
        this.selected = [];
    }

    /**
     * Корректируем индексы в сущности
     * чтобы таблица не косячила
     * @private
     */
    private correctIndexes(): void {
        this.systemCase.systemCaseUnits.forEach((unit, index) => unit.i = index)
    }
}
