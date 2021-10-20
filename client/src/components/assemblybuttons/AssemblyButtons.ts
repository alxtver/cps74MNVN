import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import stringHelper from '@/helper/StringHelper';

@Component
export default class AssemblyButtons extends Vue {
    @State((state) => state.systemCasesSerialNumbers)
    private systemCasesSerialNumbers!: string;

    @State((state) => state.selectedSerialNumber)
    private selectedSerialNumber!: string;

    @Prop()
    private serialNumberPanelStyle!: string;

    private get isDisablePrevious(): boolean {
        if (this.selectedSerialNumber) {
            return !this.systemCasesSerialNumbers.includes(
                stringHelper.minusOne(this.selectedSerialNumber)
            );
        }
        return false;
    }

    private get isDisableNext(): boolean {
        if (this.selectedSerialNumber) {
            return !this.systemCasesSerialNumbers.includes(
                stringHelper.plusOne(this.selectedSerialNumber)
            );
        }
        return false;
    }

    private previous(): void {
        this.$emit('previous');
    }

    private next(): void {
        this.$emit('next');
    }
}
