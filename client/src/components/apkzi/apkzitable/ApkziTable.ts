import Component from 'vue-class-component';
import Vue from 'vue';
import ApkziCard from '@/components/apkzi/apkzicard/ApkziCard.vue';
import Apkzi from '@/models/Apkzi';
import { State } from 'vuex-class';
import Part from '@/models/Part';
import { Watch } from 'vue-property-decorator';
import apkziApi from '@/api/ApkziApi';
import { DataTableHeader } from 'vuetify';
import SettingsMenu from '@/components/pki/pkitable/settingsmenu/SettingsMenu.vue';
import sounds from '@/helper/Sounds';
import ApkziCardTs from '@/components/apkzi/apkzicard/ApkziCard';

/**
 * Основная таблица АПКЗИ
 */
@Component({ components: { ApkziCard, SettingsMenu } })
export default class ApkziTable extends Vue {
    private apkzis: Apkzi[] = [];
    private search = '';
    private loading = false;
    private editedIndex = -1;
    private editedItem = new Apkzi();
    private dialogDelete = false;
    private isEditing = false;
    private isNewApkzi = true;

    private headers: DataTableHeader[] = [
        { text: '', value: 'index', width: 20, sortable: false },
        { text: 'ФДШИ', value: 'fdsi', sortable: false },
        { text: 'Наим. АПКЗИ', value: 'apkzi_name', sortable: false },
        { text: 'Наим. контроллера СЗИ', value: 'kont_name', sortable: false },
        { text: 'ФДШИ контроллера', value: 'fdsiKontr', sortable: false },
        { text: 'Зав. номер', value: 'zav_number', sortable: false },
        {
            text: 'Зав. номер контроллера',
            value: 'kontr_zav_number',
            sortable: false,
        },
        {
            text: 'Номер машины',
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
        this.getApkzi();
    }

    /**
     * Начальная инициализация компонента
     * @private
     */
    private mounted() {
        this.getApkzi();
    }

    /**
     * Получить все АПКЗИ по теме
     * @private
     */
    private getApkzi(): void {
        this.loading = true;
        this.apkzis = [];
        apkziApi.getApkzi().then((data) => {
            this.apkzis = this.addIndexes(data);
            this.loading = false;
        });
    }

    /**
     * Добавление индексов в таблицу АПКЗИ
     * @param arr
     * @private
     */
    private addIndexes(arr: Apkzi[]): Apkzi[] {
        return arr.map((apkzi, index) => {
            apkzi.index = index + 1;
            return apkzi;
        });
    }

    /**
     * Изменение возможности редактирования
     * @param value
     * @private
     */
    private changeEditing(value: boolean): void {
        this.isEditing = value;
    }

    /**
     * Открытие окна создания нового АПКЗИ
     * @private
     */
    private async createNewApkzi(): Promise<void> {
        const lastApkzi = await apkziApi.getLastApkzi();
        if (lastApkzi) {
            lastApkzi._id = null;
            this.editedItem = lastApkzi;
        } else {
            this.editedItem = new Apkzi();
        }
        this.editedItem.part = this.$store.state.part;
        this.isNewApkzi = true;
    }

    /**
     * Изменение таблицы после редактирования
     * @param apkzi
     * @private
     */
    private editComplete(apkzi: Apkzi): void {
        this.apkzis.splice(this.editedIndex, 1, apkzi);
    }

    /**
     * Добавить новый ПКИ в таблицу
     * @param apkzi
     * @private
     */
    private addNewApkzi(apkzi: Apkzi): void {
        this.apkzis.push(apkzi);
        this.addIndexes(this.apkzis);
    }

    /**
     * Неуникальный серийник
     * @private
     */
    private notUniqueSerialNumber(): void {
        sounds.alert();
        this.$message({
            message: 'Неуникальный серийный номер',
            type: 'error',
            customClass: 'errorMessage',
            center: true,
        });
    }

    /**
     * Подтверждение удаления АПКЗИ
     * @private
     */
    private deleteItemConfirm(item: Apkzi): void {
        apkziApi.deleteApkzi(item._id).then((data: Apkzi) => {
            this.apkzis = this.apkzis.filter(
                (apkzi: Apkzi) => apkzi._id !== data._id,
            );
            this.apkzis = this.addIndexes(this.apkzis);
            const message = `АПКЗИ удален!`;
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
     * Редактировать АПКЗИ
     * @param apkzi
     * @private
     */
    private onEditApkzi(apkzi: Apkzi): void {
        apkziApi.editApkzi(apkzi).then(() => {
            this.$message({
                message: 'Данные сохранены',
                type: 'success',
                customClass: 'successMessage',
                center: true,
            });
        });
    }

    /**
     * Нажатие на кнопку редактировать
     * @param item
     * @private
     */
    private editItem(item: Apkzi) {
        this.isNewApkzi = false;
        this.editedIndex = this.apkzis.indexOf(item);
        this.editedItem = Object.assign({}, item);
        const apkziCard = this.$refs.apkziCard as ApkziCardTs;
        apkziCard.openDialog();
    }
}
