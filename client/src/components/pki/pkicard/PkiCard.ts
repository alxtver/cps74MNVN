import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Pki from '@/models/Pki';
import pkiApi from '@/api/PkiApi';
import eanApi from '@/api/EanApi';
import converter from '@/helper/Converter';
import sounds from '@/helper/Sounds';
import { State } from 'vuex-class';

@Component
export default class PkiCardTs extends Vue {
    @Prop({ default: new Pki() })
    private editedItem!: Pki;

    @Prop({ default: true })
    private isNewPki!: boolean;

    @State((state) => state.sound)
    private sound!: boolean;

    private dialog = false;
    private valid = true;
    private autocompleteTypesPki: string[] = [];
    private autocompleteVendors: string[] = [];
    private autocompleteCountries: string[] = [];
    private searchPki: string | null = null;
    private searchVendors: string | null = null;
    private searchCountries: string | null = null;

    private typeRules = [(v) => !!v || 'Введите тип'];
    private vendorRules = [(v) => !!v || 'Введите наименование производителя'];
    private modelRules = [(v) => !!v || 'Введите модель'];
    private countryRules = [(v) => !!v || 'Введите страну'];
    private partRules = [(v) => !!v || 'Введите тему'];
    private serialNumberRules = [(v) => !!v || 'Введите серийный номер'];

    @Watch('searchPki')
    private async autoCompleteTypes(query): Promise<void> {
        if (query !== null) {
            this.autocompleteTypesPki = await pkiApi.autocompleteTypesPki(
                query,
            );
        }
    }

    @Watch('searchVendors')
    private async autoCompleteVendors(query): Promise<void> {
        if (query !== null) {
            this.autocompleteVendors = await pkiApi.autocompleteVendors(query);
        }
    }

    @Watch('searchCountries')
    private async autoCompleteCountries(query): Promise<void> {
        if (query !== null) {
            this.autocompleteCountries = await pkiApi.autocompleteCountries(
                query,
            );
        }
    }

    /**
     * Открыть диалог
     * @private
     */
    public openDialog(): void {
        this.dialog = true;
    }

    /**
     * Нажатие на кнопку добавить ПКИ
     * @private
     */
    private newPki(): void {
        this.resetValidation();
        this.$emit('createNewPki');
    }

    /**
     * Сохранить ПКИ
     * @private
     */
    private async save(): Promise<void> {
        this.editedItem.serial_number = converter.snModifier(this.editedItem).SN;
        await this.validation();
        if (!this.valid) {
            return;
        }
        if (!this.isNewPki) {
            const pki: Pki = await pkiApi.editPki(this.editedItem);
            this.$emit('editComplete', pki);
            this.dialog = false;
        } else {
                sounds.say(
                    this.editedItem.serial_number.slice(
                        this.editedItem.serial_number.length - 3,
                    ),
                    1.4, this.sound
                );
            const response = await pkiApi.addPki(this.editedItem);
            if (response instanceof Pki) {
                this.$emit('addNewPki', response);
                this.$notify({
                    title: response.serial_number,
                    message: '',
                    duration: 15000,
                    showClose: false,
                    customClass: 'sn-notify',
                });
            } else {
                this.$emit('notUniqueSerialNumber');
            }
            this.editedItem.serial_number = '';
            const serialNumberField = this.$refs
                .serialNumberField as HTMLHtmlElement;
            serialNumberField.focus();
            await this.resetValidation();
        }
    }

    /**
     * Заполнение данных по штрих-коду
     * @private
     * @param event
     */
    private async checkEan(event): Promise<void> {
        const ean = await eanApi.searchEan(event.target.value);
        if (ean) {
            this.editedItem.type_pki = ean.type_pki;
            this.editedItem.vendor = ean.vendor;
            this.editedItem.model = ean.model;
            this.editedItem.country = ean.country;
            const serialNumberField = this.$refs
                .serialNumberField as HTMLHtmlElement;
            serialNumberField.focus();
        } else {
            this.editedItem.type_pki = '';
            this.editedItem.vendor = '';
            this.editedItem.model = '';
            this.editedItem.country = '';
        }
        this.resetValidation();
    }

    /**
     * Сброс валидации
     * @private
     */
    private resetValidation(): void {
        const form = this.$refs.form as Vue & {
            resetValidation: () => boolean;
        };
        if (form) {
            form.resetValidation();
        }
    }

    /**
     * Валидация формы
     * @private
     */
    private validation(): void {
        const form = this.$refs.form as Vue & { validate: () => boolean };
        form.validate();
    }

    /**
     * Правила фильтрации в комбобоксах
     * @param item
     * @param queryText
     * @param itemText
     * @private
     */
    private filterRules(item: any, queryText: string, itemText: string) {
        const ruToEnQueryText = converter.translate(queryText).ruToEnLeather;
        const enToRuQueryText = converter.translate(queryText).enToRuLeather;
        return (
            itemText
                .toLocaleLowerCase()
                .indexOf(ruToEnQueryText.toLocaleLowerCase()) > -1 ||
            itemText
                .toLocaleLowerCase()
                .indexOf(enToRuQueryText.toLocaleLowerCase()) > -1
        );
    }
}
