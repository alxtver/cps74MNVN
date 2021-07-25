import { Component, Prop, Vue} from 'vue-property-decorator';
import converter from '@/helper/Converter';
import { State } from 'vuex-class';
import Apkzi from "@/models/Apkzi";
import apkziApi from "@/api/ApkziApi";

@Component
export default class ApkziCardTs extends Vue {
    @Prop({ default: new Apkzi() })
    private editedItem!: Apkzi;

    @Prop({ default: true })
    private isNewApkzi!: boolean;

    @State((state) => state.sound)
    private sound!: boolean;

    private dialog = false;
    private valid = true;
    private disableSaveBtn = false;

    private validationRules = [(v) => !!v || 'Обязательное поле'];

    /**
     * Открыть диалог
     * @private
     */
    public openDialog(): void {
        this.dialog = true;
    }

    /**
     * Нажатие на кнопку добавить АПКЗИ
     * @private
     */
    private newApkzi(): void {
        this.resetValidation();
        this.$emit('createNewApkzi');
    }

    /**
     * Сохранить АПКЗИ
     * @private
     */
    private async save(): Promise<void> {
        await this.validation();
        if (!this.valid) {
            return;
        }
        if (!this.isNewApkzi) {
            const apkzi: Apkzi = await apkziApi.editApkzi(this.editedItem);
            this.$emit('editComplete', apkzi);
            this.dialog = false;
        } else {
            this.disableSaveBtn = true;
            const response = await apkziApi.addApkzi(this.editedItem);
            if (response instanceof Apkzi) {
                this.$emit('addNewApkzi', response);
                this.$notify({
                    title: `${response.zav_number} сохранен!`,
                    message: '',
                    duration: 3000,
                    showClose: false,
                    customClass: 'sn-notify',
                });
                this.editedItem.zav_number = converter.plusOne(this.editedItem.zav_number);
                this.editedItem.kontr_zav_number = converter.plusOne(this.editedItem.kontr_zav_number);
                this.disableSaveBtn = false;
            } else {
                this.$emit('notUniqueSerialNumber');
                this.disableSaveBtn = false;
            }
            await this.resetValidation();
        }
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
}
