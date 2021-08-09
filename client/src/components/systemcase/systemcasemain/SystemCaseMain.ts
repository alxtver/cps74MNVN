import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import Part from '@/models/Part';
import SystemCase from '@/models/SystemCase';
import systemCaseApi from '@/api/SystemCaseApi';
import SystemCaseForm from '@/components/systemcase/systemcaseform/SystemCaseForm.vue';
import Pagination from '@/components/pagination/Pagination.vue';
import AddSystemCase from '@/components/systemcase/addsystemcase/AddSystemCase.vue';
import {
    SELECT_SERIAL_NUMBER,
    UPDATE_SYSTEM_CASES_SERIAL_NUMBERS,
} from '@/store';

@Component({ components: { SystemCaseForm, Pagination, AddSystemCase } })
export default class SystemCaseMain extends Vue {
    private systemCases: SystemCase[] = [];
    private loading = true;
    private itemsPerPage = 10; // количество элементов на странице
    private page = 1; // текущая страница
    private overlay = true;
    private listCountPages = [
        { key: 5, value: 5 },
        { key: 10, value: 10 },
        { key: 30, value: 30 },
        { key: 'Все', value: -1 },
    ];

    @State((state) => state.part)
    private part!: Part;

    @State((state) => state.selectedSerialNumber)
    private selectedSerialNumber!: string;

    @Action(UPDATE_SYSTEM_CASES_SERIAL_NUMBERS)
    private updateSystemCaseSerialNumbers!: (serialNumber: string[]) => void;

    @Action(SELECT_SERIAL_NUMBER)
    private changeSelectedSerialNumber!: (serialNumber: string | null) => void;

    @Watch('selectedSerialNumber')
    private async selectSerialNumber(): Promise<void> {
        const selectedSystemCase = this.systemCases.find(
            (systemCase) =>
                systemCase.serialNumber === this.selectedSerialNumber,
        );
        if (selectedSystemCase) {
            const index = this.systemCases.indexOf(selectedSystemCase) + 1;
            await this.changePage(Math.ceil(index / this.itemsPerPage));
            const element = document.getElementById(this.selectedSerialNumber);
            const yOffset = -165;
            const y =
                element.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

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
        this.overlay = true;
        this.systemCases = [];
        systemCaseApi.getSystemCases().then((data) => {
            this.systemCases = data;
            this.loading = false;
            this.updateSerialNumbers();
            this.selectSerialNumber();
        }).finally(()=>{
            this.overlay = false;
        });
    }

    /**
     * Смена страницы
     * @private
     * @param pageIndex
     */
    private async changePage(pageIndex): Promise<void> {
        this.page = await pageIndex;
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

    /**
     * Удалить системный блок
     * @param id
     * @private
     */
    private async removeSystemCase(id): Promise<void> {
        try {
            const response = await systemCaseApi.removeSystemCase(id);
            if (response === id) {
                this.doChangeSelectedSerialNumber(id);
                this.systemCases = this.systemCases.filter(
                    (systemCase) => systemCase._id !== id,
                );
                this.updateSerialNumbers();
            }
        } catch (e) {
            this.$message.error(e);
        }
    }

    /**
     * Смена выбранного серийного номера
     * @private
     */
    private doChangeSelectedSerialNumber(id): void {
        const index = this.systemCases.indexOf(
            this.systemCases.find((systemCase) => systemCase._id === id),
        );
        if (this.systemCases[index - 1]) {
            this.changeSelectedSerialNumber(
                this.systemCases[index - 1].serialNumber,
            );
        } else if (this.systemCases[index + 1]) {
            this.changeSelectedSerialNumber(
                this.systemCases[index + 1].serialNumber,
            );
        } else {
            this.changeSelectedSerialNumber(null);
        }
    }

    /**
     * Добавить системный блок
     * @param newSystemCase
     * @private
     */
    private addSystemCase(newSystemCase: SystemCase): void {
        this.systemCases.push(newSystemCase);
        this.updateSerialNumbers();
    }

    /**
     * Добавить несколько системных блоков (при копировании)
     * @param systemCases
     * @private
     */
    private addSystemCases(systemCases: SystemCase[]): void {
        this.systemCases.push(...systemCases);
        this.updateSerialNumbers();
    }

    /**
     * Все серийные номера системных блоков
     * @private
     */
    private get allSerialNumbers(): string[] {
        return this.systemCases.map((systemCase) => {
            return systemCase.serialNumber;
        });
    }

    private updateSerialNumbers(): void {
        this.updateSystemCaseSerialNumbers(this.allSerialNumbers);
    }
}
