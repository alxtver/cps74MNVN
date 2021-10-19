import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import CountriesTable from '@/components/countriestable/CountriesTable.vue';

@Component({ components: { CountriesTable } })
export default class Countries extends Vue {

}
