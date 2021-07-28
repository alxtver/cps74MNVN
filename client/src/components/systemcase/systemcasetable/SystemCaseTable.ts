import { Component, Prop, Vue } from 'vue-property-decorator';
import SystemCase from "@/models/SystemCase";

@Component({ components: {} })
export default class SystemCaseTable extends Vue {
    @Prop()
    private systemCase!: SystemCase;

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

    private insertSerialNumber(props: any): void {
        props.item.serialNumber = props.value;
        debugger
    }

    private cancel () {
        console.log('cancel')
    }

    private test(a, b) {
        debugger
    }
}
