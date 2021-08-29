import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Pc from '@/models/Pc';
import Unit from '@/models/Unit';
import alexa from '@/helper/Alexa';
import table from '@/helper/Table';
import pcApi from '@/api/PcApi';

@Component
export default class PcTable extends Vue {
    @Prop()
    private pc!: Pc;

    @Prop({ default: false })
    private editPc!: boolean;

    @Prop({ default: 'pcUnit' })
    private unit!: string;

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

    /**
     * Изменяем класс строки
     * @param row
     * @private
     */
    private itemClass(row): string {
        if (this.unit === 'pcUnit') {
            return this.pc.pc_unit.indexOf(row) === this.selectedRow
                ? 'td active'
                : 'td not-active';
        }
        return this.pc.system_case_unit.indexOf(row) === this.selectedRow
            ? 'td active'
            : 'td not-active';
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
        if (this.editPc) {
            return;
        }
        const item: Unit = props.item;
        if (item.type === 'Системный блок') {
            await this.insertSerialNumberSystemCase(item);
            return;
        }
        const data = await pcApi.editSerialNumber(item, this.pc._id);
        if (data.oldPc) {
            this.$emit('updatePc', data.oldPc);
        }
        const find: Unit = this.pc.pc_unit.find((unit) => unit.i === item.i);
        Object.assign(find, data.editableUnit);
        if (data.editableUnit.name === 'Н/Д') {
            alexa.alert();
            this.$message.error('Не найден серийный номер!');
        }
        if (data.message) {
            alexa.alert();
            this.$message.error(data.message);
        }
        props.item.serial_number = props.value;
        table.goToNextCell(
            this,
            props,
            this.pc.pc_unit,
            this.pc.serial_number,
            this.sound,
            this.$route.path,
        );
        this.$nextTick(() => {
            this.$emit('painting');
        });
    }

    private async insertSerialNumberSystemCase(item: Unit): Promise<void> {
        const response = await pcApi.editSystemCaseSerialNumber(
            item,
            this.pc._id,
        );
        this.pc.system_case_unit = response.systemCaseUnits;
        if (response.oldPc) {
            this.$emit('updatePc', response.oldPc);
        }
        const find: Unit = this.pc.pc_unit.find((unit) => unit.i === item.i);
        Object.assign(find, response.editableUnit);
        if (response.message) {
            alexa.alert();
            this.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                duration: 0,
            });
        }
    }

    /**
     * Редактируемая ли ячейка
     * @param item
     * @private
     */
    private isEditableCell(item): boolean {
        if (this.editPc) {
            return true;
        }
        if (item.apkzi) {
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
        const units = this.pc.system_case_unit;
        for (const item of this.selected) {
            units.splice(units.indexOf(item) + 1, 0, new Unit());
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
        const units = this.pc.system_case_unit;
        for (const item of this.selected) {
            units.splice(units.indexOf(item), 1);
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
        this.pc.pc_unit.forEach((unit, index) => (unit.i = index));
        this.pc.system_case_unit.forEach((unit, index) => (unit.i = index));
    }
}
