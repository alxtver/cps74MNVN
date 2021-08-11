import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import AddPcCard from '@/components/pc/components/addpccard/AddPcCard.vue';
import AddSystemCaseCardTS from '@/components/systemcase/addsystemcasecard/AddSystemCaseCard';
import Pc from "@/models/Pc";

@Component({ components: { AddPcCard } })
export default class AddPc extends Vue {
    @Prop({ default: () => [] })
    private serialNumbers!: string[];

    @Prop({ default: false })
    private openDialog!: boolean;

    private dialog = false;

    @Watch('openDialog')
    private changeStateDialog(): void {
        this.dialog = this.openDialog;
    }

    @Ref('addPcCard')
    private addPcCard!: AddSystemCaseCardTS;

    private resetValidation(): void {
        if (this.addPcCard) {
            this.addPcCard.resetValidation();
        }
    }

    private addPc(pc: Pc): void {
        this.$emit('addPc', pc);
    }
}
