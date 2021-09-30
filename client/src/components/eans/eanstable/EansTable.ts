import Vue from 'vue';
import Ean from '@/models/Ean';
import { DataTableHeader } from 'vuetify';
import { Component } from 'vue-property-decorator';
import eanApi from '@/api/EanApi';
import Unit from '@/models/Unit';

@Component
export default class EansTable extends Vue {
    private eanCodes: Ean[] = [];
    private search = '';
    private selectedRow = -1;
    private headers: DataTableHeader[] = [
        { text: 'Штрих-код', value: 'ean_code', sortable: false },
        { text: 'Тип', value: 'type_pki', sortable: false },
        { text: 'Производитель', value: 'vendor', sortable: false },
        { text: 'Модель', value: 'model', sortable: false },
        { text: 'Страна', value: 'country', sortable: false },
        { text: '', value: 'actions', width: 20, sortable: false },
    ];

    private mounted(): void {
        eanApi.getAllEan().then((data) => (this.eanCodes = data));
    }

    private onSelectRow(row: Unit, event): void {
        this.selectedRow = event.index + 1;
    }

    private deleteItemConfirm(item): void {
        eanApi.deleteEan(item._id).then(data => {
            this.eanCodes = this.eanCodes.filter(code => code._id !== data._id);
        });
    }

    private onEditEan(item): void {
        eanApi.updateEan(item).then();
    }
}
