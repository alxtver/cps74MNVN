import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: {} })
export default class GroupButtons extends Vue {
    @Prop({ default: 'pc' })
    item!: string;

    private doRemove(): void {
        const message: string =
            this.item === 'pc' ? 'Удалить ПЭВМ?' : 'Удалить системный блок?';
        this.$confirm(message)
            .then(() => {
                this.$emit('doRemove');
            })
    }
}
