import { Component, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Part from '@/models/Part';
import SystemCase from '@/models/SystemCase';
import systemCaseApi from '@/api/SystemCaseApi';
import SystemCaseForm from '@/components/systemcase/systemcaseform/SystemCaseForm.vue';
import Pagination from '@/components/pagination/Pagination.vue';

@Component({ components: { SystemCaseForm, Pagination } })
export default class SystemCaseMain extends Vue {
    private systemCases: SystemCase[] = [];
    private loading = false;
    private itemsPerPage = 10; // количество элементов на странице
    private page = 1; // текущая страница
    // пропсы для футера
    private footerProps = {
        'items-per-page-options': [5, 10, 30, 50, -1],
        'items-per-page-text': 'Количество системных блоков на странице',
    };

    @State((state) => state.part)
    private part!: Part;

    @Watch('part', { immediate: false })
    private changePart(): void {
        this.getSystemCase();
    }

    /**
     * Начальная инициализация компонента
     * @private
     */
    private mounted() {
        this.getSystemCase();
    }

    /**
     * Получить все системные блоки по теме
     * @private
     */
    private getSystemCase(): void {
        this.loading = true;
        this.systemCases = [];
        systemCaseApi.getSystemCases().then((data) => {
            this.systemCases = data;
            this.loading = false;
        });
    }

    /**
     * Смена страницы
     * @param page
     * @private
     */
    private changePage(page): void {
        this.page = page;
    }
}
