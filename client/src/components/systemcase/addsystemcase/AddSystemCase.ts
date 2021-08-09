import {Component, Prop, Ref, Vue, Watch} from 'vue-property-decorator';
import AddSystemCaseCard from '@/components/systemcase/addsystemcasecard/AddSystemCaseCard.vue';
import AddSystemCaseCardTS from '@/components/systemcase/addsystemcasecard/AddSystemCaseCard';

@Component({ components: { AddSystemCaseCard } })
export default class AddSystemCase extends Vue {
    @Prop({ default: () => [] })
    private serialNumbers!: string[];

    @Prop({ default: false })
    private openDialog!: boolean;

    private dialog = false;

    @Watch('openDialog')
    private changeStateDialog(): void {
        this.dialog = this.openDialog;
    }

    @Ref('addSystemCaseCard')
    private addSystemCaseCard!: AddSystemCaseCardTS;

    private resetValidation(): void {
        if (this.addSystemCaseCard) {
            this.addSystemCaseCard.resetValidation();
        }
    }

    private addSystemCase(newSystemCase): void {
        this.$emit('addSystemCase', newSystemCase);
    }
}
