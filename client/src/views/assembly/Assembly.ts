import {Component, Ref, Vue, Watch} from 'vue-property-decorator';
import SystemCaseForm from '@/components/systemcase/systemcaseform/SystemCaseForm.vue';
import SystemCaseFormTs from '@/components/systemcase/systemcaseform/SystemCaseForm';
import { Action, State } from 'vuex-class';
import SystemCase from '@/models/SystemCase';
import systemCaseApi from '@/api/SystemCaseApi';
import AssemblyButtons from '@/components/assemblybuttons/AssemblyButtons.vue';
import stringHelper from '@/helper/StringHelper';
import { SELECT_SERIAL_NUMBER } from '@/store';
import alexa from '@/helper/Alexa';

@Component({ components: { SystemCaseForm, AssemblyButtons } })
export default class Assembly extends Vue {
    private systemCase: SystemCase | null = null;

    private show = true;

    private cardClass = '';

    @State((state) => state.selectedSerialNumber)
    private selectedSerialNumber!: string;

    @State((state) => state.part)
    private part!: string;

    @State((state) => state.systemCasesSerialNumbers)
    private systemCasesSerialNumbers!: string;

    @Ref('systemCaseForm')
    private systemCaseForm!: SystemCaseFormTs;

    @Watch('selectedSerialNumber', { immediate: true })
    private changeSerialNumber(): void {
        this.getSystemCaseByNumber();
    }

    @Action(SELECT_SERIAL_NUMBER)
    private selectSerialNumber!: (serialNumber: string) => void;

    /**
     * Получить системный блок по серийному номеру
     * @private
     */
    private async getSystemCaseByNumber(): Promise<void> {
        this.systemCase = await systemCaseApi.getSystemCaseByNumber(
            this.selectedSerialNumber,
        );
    }

    /**
     * Предыдущий системный блок
     * @private
     */
    private previous(): void {
        if (
            this.systemCasesSerialNumbers.includes(
                stringHelper.minusOne(this.selectedSerialNumber),
            )
        ) {
            this.show = false;
            this.selectSerialNumber(
                stringHelper.minusOne(this.selectedSerialNumber),
            );
            this.cardClass = 'pcCardAssemblyPrevious';
            alexa.wave();
            setTimeout(() => {
                this.cardClass = '';
                this.systemCaseForm.painting();
            }, 500);
        }
    }

    /**
     * Следующий системный блок
     * @private
     */
    private next(): void {
        if (
            this.systemCasesSerialNumbers.includes(
                stringHelper.plusOne(this.selectedSerialNumber),
            )
        ) {
            this.show = false;
            this.selectSerialNumber(
                stringHelper.plusOne(this.selectedSerialNumber),
            );
            this.cardClass = 'pcCardAssemblyNext';
            alexa.wave();
            setTimeout(() => {
                this.cardClass = '';
                this.systemCaseForm.painting();
            }, 500);
        }
    }

    /**
     * Вешаем слушатели
     * @private
     */
    private beforeMount() {
        window.addEventListener('keydown', this.handleKeydown, null);
    }

    /**
     * Убираем слушатели
     * @private
     */
    private beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    /**
     * Обработчик клавиш
     * @param e
     * @private
     */
    private handleKeydown(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === 'ArrowRight') {
            e.preventDefault();
            this.next();
        } else if (e.ctrlKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            this.previous();
        }
    }

    private touchStartMethod(touchEvent): void {
        if (touchEvent.changedTouches.length !== 1) {
            // We only care if one finger is used
            return;
        }
        const posXStart = touchEvent.changedTouches[0].clientX;
        addEventListener(
            'touchend',
            (touchEvent) => this.touchEnd(touchEvent, posXStart),
            { once: true },
        );
    }

    private touchEnd(touchEvent, posXStart) {
        if (touchEvent.changedTouches.length !== 1) {
            // We only care if one finger is used
            return;
        }
        const posXEnd = touchEvent.changedTouches[0].clientX;
        if (posXStart < posXEnd) {
            this.previous(); // swipe right
        } else if (posXStart > posXEnd) {
            this.next(); // swipe left
        }
    }
}
