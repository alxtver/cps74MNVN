import { Component, Vue } from 'vue-property-decorator';
import Pagination from '@/components/pagination/Pagination.vue';

@Component({ components: { Pagination } })
export default class PcMain extends Vue {
	private itemsPerPage = 10; // количество элементов на странице
	private page = 1; // текущая страница
	private overlay = true;
	private listCountPages = [
		{ key: 5, value: 5 },
		{ key: 10, value: 10 },
		{ key: 30, value: 30 },
		{ key: 'Все', value: -1 },
	];
}
