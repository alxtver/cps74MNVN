import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import AddSystemCaseCard from '@/components/systemcase/addsystemcasecard/AddSystemCaseCard.vue';
import AddSystemCaseCardTS from '@/components/systemcase/addsystemcasecard/AddSystemCaseCard';
import SystemCase from '@/models/SystemCase';

@Component({ components: { AddSystemCaseCard } })
export default class EditSystemCase extends Vue {
    @Prop({ default: () => [] })
    private serialNumbers!: string[];

    @Prop()
    private systemCase!: SystemCase;

    private dialog = false;

    @Ref('addSystemCaseCard')
    private addSystemCaseCard!: AddSystemCaseCardTS;

    /**
     * Редактировать системный блок
     * @param systemCase
     * @private
     */
    private editSystemCase(systemCase): void {
        this.$emit('editSystemCase', systemCase);
    }

    public closeDialog(): void {
        this.dialog = false;
    }

    public openDialog(): void {
        this.dialog = true;
    }
}
