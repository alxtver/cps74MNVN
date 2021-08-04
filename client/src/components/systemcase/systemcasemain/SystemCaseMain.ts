import { Component, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Part from '@/models/Part';
import SystemCase from '@/models/SystemCase';
import systemCaseApi from '@/api/SystemCaseApi';
import SystemCaseForm from '@/components/systemcase/systemcaseform/SystemCaseForm.vue';
import Pagination from '@/components/pagination/Pagination.vue';
import AddSystemCase from '@/components/systemcase/addsystemcase/AddSystemCase.vue';

@Component({ components: { SystemCaseForm, Pagination, AddSystemCase } })
export default class SystemCaseMain extends Vue {
    private systemCases: SystemCase[] = [];
    private loading = true;
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

    private get countPages(): number {
        if (this.itemsPerPage === -1) {
            return 1;
        }
        return Math.ceil(this.systemCases.length / this.itemsPerPage);
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

    /**
     * Следующая страница
     * @private
     */
    private nextPage(): void {
        this.page++;
    }

    /**
     * Предыдущая страница
     * @private
     */
    private previousPage(): void {
        this.loading = true;
        this.page--;
    }

    /**
     * Обновить системный блок
     * @param oldSystemCase
     * @private
     */
    private updateSystemCase(oldSystemCase): void {
        const outdatedSystemCase = this.systemCases.find(
            (systemCase) => systemCase._id === oldSystemCase._id,
        );
        Object.assign(outdatedSystemCase, oldSystemCase);
    }

    private async removeSystemCase(id): Promise<void> {
        try {
            const response = await systemCaseApi.removeSystemCase(id);
            if (response === id) {
                this.systemCases = this.systemCases.filter(
                    (systemCase) => systemCase._id !== id,
                );
            }
        } catch (e) {
            this.$message.error(e);
        }
    }

    /**
     * Добавить системный блок
     * @param newSystemCase
     * @private
     */
    private addSystemCase(newSystemCase): void {
        this.systemCases.push(newSystemCase);
    }

    /**
     * Все серийные номера системных блоков
     * @private
     */
    private get allSerialNumbers(): string[] {
        return this.systemCases.map((systemCase) => {
            return systemCase.serialNumber
        })
    }
}
