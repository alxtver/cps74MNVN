import { Component, Vue, Watch } from 'vue-property-decorator';
import Pagination from '@/components/pagination/Pagination.vue';
import PcForm from '@/components/pc/components/pcform/PcForm.vue';
import Pc from '@/models/Pc';
import pcApi from '@/api/PcApi';
import { Action, State } from 'vuex-class';
import Part from '@/models/Part';
import { SELECTED_PC, UPDATE_PC_SERIAL_NUMBERS } from '@/store';
import AddPc from '@/components/pc/components/addpc/AddPc.vue';
import Export from '@/components/pc/components/export/Export.vue';
import exportDocX from '@/helper/ExportDocX';

@Component({ components: { Pagination, PcForm, AddPc, Export } })
export default class PcMain extends Vue {
    private pc: Pc[] = [];
    private itemsPerPage = 10; // количество элементов на странице
    private page = 1; // текущая страница
    private overlay = true;
    private listCountPages = [
        { key: 5, value: 5 },
        { key: 10, value: 10 },
        { key: 30, value: 30 },
        { key: 'Все', value: -1 },
    ];

    @Action(UPDATE_PC_SERIAL_NUMBERS)
    private updatePcSerialNumbers!: (serialNumber: string[]) => void;

    @Action(SELECTED_PC)
    private changeSelectedPc!: (serialNumber: string | null) => void;

    @State((state) => state.part)
    private part!: Part;

    @State((state) => state.company)
    private company!: string;

    @Watch('part', { immediate: false })
    private changePart(): void {
        this.getAllPc();
    }

    private mounted() {
        this.getAllPc();
    }

    /**
     * Получить все ПЭВМ за тему
     */
    private async getAllPc(): Promise<void> {
        this.overlay = true;
        this.pc = [];
        this.pc = await pcApi.getAllPc();
        this.updateSerialNumbers();
        this.overlay = false;
    }

    /**
     * Количество страниц
     * @private
     */
    private get countPages(): number {
        if (this.itemsPerPage === -1) {
            return 1;
        }
        return Math.ceil(this.pc.length / this.itemsPerPage);
    }

    /**
     * Добавить ПЭВМ
     * @param pc
     * @private
     */
    private addNewPc(pc: Pc): void {
        this.pc.push(pc);
        this.updateSerialNumbers();
    }

    /**
     * Смена страницы
     * @param pageIndex
     * @private
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
        this.page--;
    }

    /**
     * Добавить несколько системных блоков (при копировании)
     * @private
     * @param pc
     */
    private addPc(pc: Pc[]): void {
        this.pc.push(...pc);
        this.updateSerialNumbers();
    }

    /**
     * Удалить ПЭВМ
     * @param id
     * @private
     */
    private async removePc(id): Promise<void> {
        try {
            const response = await pcApi.removePc(id);
            if (response === id) {
                this.doChangeSelectedSerialNumber(id);
                this.pc = this.pc.filter((pc) => pc._id !== id);
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
        const index = this.pc.indexOf(this.pc.find((pc) => pc._id === id));
        if (this.pc[index - 1]) {
            this.changeSelectedPc(this.pc[index - 1].serial_number);
        } else if (this.pc[index + 1]) {
            this.changeSelectedPc(this.pc[index + 1].serial_number);
        } else {
            this.changeSelectedPc(null);
        }
    }

    /**
     * Все серийные номера ПЭВМ
     * @private
     */
    private get allSerialNumbers(): string[] {
        return this.pc.map((pc) => {
            return pc.serial_number;
        });
    }

    /**
     * Обновить системный блок
     * @param oldPc
     * @private
     */
    private updatePc(oldPc): void {
        const updatedPc = this.pc.find((pc) => pc._id === oldPc._id);
        Object.assign(updatedPc, oldPc);
    }

    private updateSerialNumbers(): void {
        this.updatePcSerialNumbers(this.allSerialNumbers);
    }

    /**
     * Получение печатной формы
     * @param firstPc
     * @param lastPc
     * @param document
     * @private
     */
    private exportDoc(firstPc: string, lastPc: string, document: string): void {
        const firstPcIndex = this.pc.indexOf(
            this.pc.find((pc) => pc.serial_number === firstPc),
        );
        const lastPcIndex = this.pc.indexOf(
            this.pc.find((pc) => pc.serial_number === lastPc),
        );
        for (let i = 0; i < this.pc.length; i++) {
            setTimeout(() => {
                if (i >= firstPcIndex && i <= lastPcIndex) {
                    if (document === 'Паспорт') {
                        exportDocX.passport(this.pc[i], this.company);
                    } else if (document === 'Системный блок ЗИП') {
                        exportDocX.systemCaseZip(this.pc[i], this.company);
                    } else {
                        exportDocX.zipLabel(this.pc[i], this.company);
                    }
                }
            }, i*500);
        }
    }
}
