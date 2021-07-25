import {Component, Prop, Vue} from 'vue-property-decorator';
import SystemCase from "@/models/SystemCase";
import SystemCaseTable from "@/components/systemcase/systemcasetable/SystemCaseTable.vue";

@Component({components: {SystemCaseTable}})
export default class SystemCaseForm extends Vue {
    @Prop()
    private systemCase!: SystemCase;

}
