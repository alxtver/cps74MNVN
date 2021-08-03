import { Component, Prop, Vue } from 'vue-property-decorator';
import SystemCase from '@/models/SystemCase';
import SystemCaseTable from '@/components/systemcase/systemcasetable/SystemCaseTable.vue';
import GroupButtons from '@/components/groupbuttons/GroupButtons.vue';

@Component({ components: { SystemCaseTable, GroupButtons } })
export default class SystemCaseForm extends Vue {
    @Prop()
    private systemCase!: SystemCase;

    private updateSystemCase(oldSystemCase): void {
        this.$emit('updateSystemCase', oldSystemCase)
    }

    private get systemCaseShadow(): string {
        const color = this.systemCase.back_color;
        return `box-shadow: 0px 6px 14px 4px ${color}, 0px 4px 18px 3px ${color};`
    }
}
