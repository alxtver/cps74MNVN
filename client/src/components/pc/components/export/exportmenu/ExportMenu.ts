import { Component, Prop, Vue } from 'vue-property-decorator';
import Pc from '@/models/Pc';
import exportDocX from "@/helper/ExportDocX";

@Component
export default class ExportMenu extends Vue {
    @Prop()
    private pc!: Pc;

    @Prop({default: 'cps'})
    private company!: string;

    private exportPassport(): void {
        exportDocX.passport(this.pc, this.company)
    }

    private exportSystemCaseZip(): void {
        exportDocX.systemCaseZip(this.pc, this.company)
    }

    private exportZipLabel(): void {
        exportDocX.zipLabel(this.pc, this.company)
    }
}
