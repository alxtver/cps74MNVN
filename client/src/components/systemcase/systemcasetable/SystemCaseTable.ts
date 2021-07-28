import { Component, Prop, Vue } from 'vue-property-decorator';
import SystemCase from '@/models/SystemCase';

@Component({ components: {} })
export default class SystemCaseTable extends Vue {
    @Prop()
    private systemCase!: SystemCase;

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
    ];

    private itemClass(a): string {
        return a.i === this.selectedRow ? 'active' : '';
    }

    /**
     * Ввод серийного номера
     * @param props
     * @private
     */
    private insertSerialNumber(props: any): void {
        props.item.serialNumber = props.value;
        this.goToNextCell(props);
    }


    /**
     * Переход на следующую ячейку
     * @param props
     * @private
     */
    private goToNextCell(props: any): void {
        if (props.index + 1 >= this.systemCase.systemCaseUnits.length) {
            this.selectedRow = -1;
            return
        }
        const nextCell = this.$el.children[1].children[0].children[2].children[
        props.index + 1
            ].children[4].children[0] as HTMLHtmlElement;
        nextCell.click();
    }

    private open(index: number): void {
        this.selectedRow = index;
    }
    private cancel() {
    }

    private test(a, b) {}
}
