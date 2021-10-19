import { Component, Vue } from 'vue-property-decorator';
import Country from '@/models/Country';
import countryApi from '@/api/CountryApi';
import { DataTableHeader } from 'vuetify';
import Unit from '@/models/Unit';

@Component
export default class CountriesTable extends Vue {
    private countries: Country[] = [];
    private search = '';
    private selectedRow = -1;
    private headers: DataTableHeader[] = [
        { text: 'Наименование', value: 'country', sortable: true },
        { text: '', value: 'actions', width: 20, sortable: false },
    ];

    private mounted(): void {
        countryApi.getAllCountries().then((data) => (this.countries = data));
    }

    private onSelectRow(row: Unit, event): void {
        this.selectedRow = event.index + 1;
    }

  private deleteItemConfirm(item): void {
    countryApi.deleteCountry(item._id).then(data => {
      this.countries = this.countries.filter(country => country._id !== data._id);
    });
  }

  private onEditCountry(item): void {
    countryApi.updateCountry(item).then();
  }
}
