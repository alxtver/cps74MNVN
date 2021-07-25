import { Component, Prop, Vue } from 'vue-property-decorator';
import Unit from '@/models/Unit';

@Component({ components: {} })
export default class SystemCaseTable extends Vue {
    @Prop()
    private systemCaseUnits!: Unit;

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
}
