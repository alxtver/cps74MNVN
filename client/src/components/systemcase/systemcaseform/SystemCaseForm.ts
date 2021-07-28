import { Component, Prop, Vue } from 'vue-property-decorator';
import SystemCase from '@/models/SystemCase';
import SystemCaseTable from '@/components/systemcase/systemcasetable/SystemCaseTable.vue';
import GroupButtons from '@/components/groupbuttons/GroupButtons.vue';

@Component({ components: { SystemCaseTable, GroupButtons } })
export default class SystemCaseForm extends Vue {
    @Prop()
    private systemCase!: SystemCase;
}
