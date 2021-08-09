import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: {} })
export default class GroupButtons extends Vue {
    @Prop({ default: 'pc' })
    item!: string;

    /**
     * Нажатие на кнопку редактировать
     * @private
     */
    private doEdit(): void {
        this.$emit('doEdit')
    }

    /**
     * Нажатие на кнопку копировать
     * @private
     */
    private doCopy(): void {
        this.$emit('doCopy')
    }

    /**
     * Нажатие на кнопку удалить
     * @private
     */
    private doRemove(): void {
        const message: string =
            this.item === 'pc' ? 'Удалить ПЭВМ?' : 'Удалить системный блок?';
        this.$confirm(message)
            .then(() => {
                this.$emit('doRemove');
            })
    }
}
