import { Component, Prop, Vue } from 'vue-property-decorator';
import stringHelper from '@/helper/StringHelper';

@Component
export default class CopyForm extends Vue {
    @Prop()
    title!: string;

    @Prop()
    currentSerialNumber!: string;

    @Prop()
    serialNumbers!: string[];

    private dialog = false;

    private firstSerialNumber = '';

    private lastSerialNumber: string | null = null;

    private count: string | null = null;

    private disableCopy = true;

    private rules = {
        counter: (value) => {
            if (value) {
                return value.length <= 3 || 'Максимально 999';
            }
            return false;
        },
        number: (value) => {
            const pattern = /^[1-9][0-9]*$/;
            return pattern.test(value) || 'Только цифры';
        },
    };

    /**
     * Изменение количества копируемых элементов
     * @param value
     * @private
     */
    private changeCount(value): void {
        const counter = this.rules.counter(value);
        const isNumbers = this.rules.number(value);
        if (counter === true && isNumbers === true) {
            const arrayOfSerialNumbers = [];
            let serialNumber = this.firstSerialNumber;
            arrayOfSerialNumbers.push(serialNumber);
            this.lastSerialNumber = serialNumber;
            for (let i = 1; i < Number(value); i++) {
                this.lastSerialNumber = stringHelper.plusOne(serialNumber);
                serialNumber = this.lastSerialNumber;
                arrayOfSerialNumbers.push(serialNumber);
            }
            if (!this.isCorrectSerialNumbers(arrayOfSerialNumbers)) {
                this.$message.error('Неуникальные серийные номера');
                this.disableCopy = true;
            } else {
                this.disableCopy = false;
            }
        } else {
            this.lastSerialNumber = null;
        }
    }

    /**
     * Изменение первого серийного номера
     * @private
     */
    private changeFirst(): void {
        this.changeCount(this.count);
    }

    /**
     * Изменение последнего серийного номера
     * @private
     */
    private changeLast(): void {
        const validate = stringHelper.checkSerialNumbers(
            this.firstSerialNumber,
            this.lastSerialNumber,
        );
        if (validate) {
            this.count = (
                stringHelper.getNumber(this.lastSerialNumber) -
                stringHelper.getNumber(this.firstSerialNumber) +
                1
            ).toString();
        } else {
            this.count = null;
        }
    }

    /**
     * Проверка серийных номеров
     * @param serialNumbers
     * @private
     */
    private isCorrectSerialNumbers(serialNumbers: string[]): boolean {
        for (const serialNumber of serialNumbers) {
            if (this.serialNumbers.includes(serialNumber)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Открыть диалог
     */
    public openDialog(): void {
        this.firstSerialNumber = stringHelper.plusOne(this.currentSerialNumber);
        this.dialog = true;
    }

    /**
     * Закрыть диалог
     */
    public closeDialog(): void {
        this.clearForm();
        this.dialog = false;
    }

    /**
     * Нажатие на кнопку копировать
     * @private
     */
    private async copy(): Promise<void> {
        this.$emit(
            'copy',
            this.currentSerialNumber,
            this.firstSerialNumber,
            this.lastSerialNumber,
        );
        this.closeDialog();
    }

    /**
     * Очистка формы
     * @private
     */
    private clearForm(): void {
        this.firstSerialNumber = null;
        this.lastSerialNumber = null;
        this.count = null;
    }
}
