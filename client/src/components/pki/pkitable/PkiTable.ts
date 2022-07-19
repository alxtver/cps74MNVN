import Component from 'vue-class-component';
import Vue from 'vue';
import pkiApi from '@/api/PkiApi';
import Pki from '@/models/Pki';
import PkiCard from '@/components/pki/pkicard/PkiCard.vue';
import { State } from 'vuex-class';
import Part from '@/models/Part';
import { Ref, Watch } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import PkiCardTs from '@/components/pki/pkicard/PkiCard';
import SettingsMenu from '@/components/pki/pkitable/settingsmenu/SettingsMenu.vue';
import alexa from '@/helper/Alexa';
import Unit from '@/models/Unit';

@Component({ components: { PkiCard, SettingsMenu } })
export default class PkiTable extends Vue {
    private pkis: Pki[] = [];
    private search = '';
    private loading = false;
    private editedIndex = -1;
    private editedItem = new Pki();
    private dialogDelete = false;
    private selectedType = 'Все';
    private isNewPki = true;
    private isEditing = false;
    private selectedRow = -1;
    private overlay = true;

    private headers: DataTableHeader[] = [
        { text: '', value: 'index', width: 20, sortable: false },
        { text: 'Тип', value: 'type_pki', sortable: false },
        { text: 'Производитель', value: 'vendor', sortable: false },
        { text: 'Модель', value: 'model', sortable: false },
        { text: 'Серийный номер', value: 'serial_number', sortable: false },
        { text: 'Страна', value: 'country', sortable: false },
        {
            text: 'Номер СБ',
            value: 'number_machine',
            width: 140,
            sortable: false,
        },
        { text: '', value: 'actions', width: 75, sortable: false },
    ];

    @State((state) => state.part)
    private part!: Part;

    @Watch('part', { immediate: false })
    private changePart(): void {
        this.getPki();
    }

    /**
     * Изменяем класс строки
     * @param row
     * @private
     */
    private itemClass(row): string {
        return row.index === this.selectedRow ? 'td active' : 'td not-active';
    }

    /**
     * Начальная инициализация компонента
     * @private
     */
    private mounted() {
        this.getPki();
    }

    /**
     * Получить все ПКИ по теме
     * @private
     */
    private getPki(): void {
        this.loading = true;
        this.overlay = true;
        this.pkis = [];
        pkiApi
            .getPki()
            .then((data) => {
                this.pkis = this.addIndexes(data);
                this.loading = false;
            })
            .finally(() => {
                this.overlay = false;
            });
    }

    @Ref('pkiCard')
    private pkiCard!: PkiCardTs;
    /**
     * Нажатие на кнопку редактировать
     * @param item
     * @private
     */
    private editItem(item) {
        this.isNewPki = false;
        this.editedIndex = this.pkis.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.pkiCard.openDialog();
    }

    /**
     * Типы ПКИ
     * @private
     */
    private get types(): string[] {
        const types = this.pkis.reduce((uniqueTypes: string[], pki: Pki) => {
            if (!uniqueTypes.includes(pki.type_pki)) {
                uniqueTypes.push(pki.type_pki);
            }
            return uniqueTypes;
        }, []);
        types.unshift('Все');
        return types;
    }

    /**
     * Отображаемые ПКИ
     * @private
     */
    private get displayedPki(): Pki[] {
        const filteredItems =
            this.selectedType === 'Все'
                ? this.pkis
                : this.pkis.filter((pki) => pki.type_pki === this.selectedType);
        return this.addIndexes(filteredItems);
    }

    /**
     * Подтверждение удаления ПКИ
     * @private
     */
    private deleteItemConfirm(item: Pki): void {
        pkiApi.deletePki(item._id).then((data: Pki) => {
            this.pkis = this.pkis.filter((pki) => pki._id !== data._id);
            this.pkis = this.addIndexes(this.pkis);
            const message = `ПКИ
                             ${item.type_pki}
                             ${item.vendor}
                             ${item.model} №
                             ${item.serial_number} удален!`;
            this.$message({
                message,
                type: 'error',
                customClass: 'errorMessage',
                center: true,
            });
            this.dialogDelete = false;
        });
    }

    /**
     * Добавление индексов в таблицу ПКИ
     * @param arr
     * @private
     */
    private addIndexes(arr: Pki[]): Pki[] {
        return arr.map((pki, index) => {
            pki.index = index + 1;
            return pki;
        });
    }

    /**
     * Редактировать ПКИ
     * @param pki
     * @private
     */
    private onEditPKI(pki: Pki): void {
        pkiApi.editPki(pki).then(() => {
            this.$message({
                message: 'Данные сохранены',
                type: 'success',
                customClass: 'successMessage',
                center: true,
            });
        });
    }

    /**
     * Открытие окна создания нового ПКИ
     * @private
     */
    private async createNewPki(): Promise<void> {
        const lastPki = await pkiApi.getLastPki();
        if (lastPki) {
            lastPki._id = null;
            lastPki.serial_number = null;
            this.editedItem = lastPki;
        } else {
            this.editedItem = new Pki();
        }
        this.editedItem.part = this.$store.state.part;
        this.isNewPki = true;
    }

    /**
     * Изменение таблицы после редактирования
     * @param pki
     * @private
     */
    private editComplete(pki: Pki): void {
        this.pkis.splice(this.editedIndex, 1, pki);
    }

    private changeEditing(value: boolean): void {
        this.isEditing = value;
    }

    /**
     * Добавить новый ПКИ в таблицу
     * @param pki
     * @private
     */
    private addNewPki(pki: Pki): void {
        this.pkis.push(pki);
        this.addIndexes(this.pkis);
    }

    /**
     * Неуникальный серийник
     * @private
     */
    private notUniqueSerialNumber(): void {
        alexa.alert();
        this.$message({
            message: 'Неуникальный серийный номер',
            type: 'error',
            customClass: 'errorMessage',
            center: true,
        });
    }

    /**
     * Выбор строки
     * @param row
     * @param event
     * @private
     */
    private onSelectRow(row: Unit, event): void {
        this.selectedRow = event.index + 1;
    }
}
