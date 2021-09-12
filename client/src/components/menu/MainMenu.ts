import Vue from 'vue';
import partApi from '@/api/PartApi';
import Component from 'vue-class-component';
import Part from '@/models/Part';
import { mdiCog, mdiVolumeHigh, mdiVolumeOff } from '@mdi/js';
import { Action, State } from 'vuex-class';
import {
    CHANGE_COMPANY,
    CHANGE_SOUND,
    SELECT_SERIAL_NUMBER,
    UPDATE_PC_SERIAL_NUMBERS,
    UPDATE_SYSTEM_CASES_SERIAL_NUMBERS,
    UPDATE_USER,
} from '@/store';
import { Watch } from 'vue-property-decorator';
import systemCaseApi from '@/api/SystemCaseApi';
import pcApi from '@/api/PcApi';
import User from '@/models/User';
import authApi from '@/api/authapi/AuthApi';

@Component
export default class MainMenu extends Vue {
    private currentPart = '';
    private parts: Part[] = [];
    private drawer = false;
    private iconCog = mdiCog;
    private iconVolumeHigh = mdiVolumeHigh;
    private iconVolumeOff = mdiVolumeOff;
    private currentSn: string | null = null;
    private serialNumbers: string[] = [];
    private selectedCompany = '';
    private companies = [
        { companyName: 'ЦПС', value: 'cps' },
        { companyName: 'АВК', value: 'avk' },
    ];

    @State((state) => state.sound)
    private sound!: boolean;

    @State((state) => state.systemCasesSerialNumbers)
    private systemCaseSerialNumbers!: string[];

    @State((state) => state.selectedSerialNumber)
    private selectedSerialNumber!: string;

    @State((state) => state.pcSerialNumbers)
    private pcSerialNumbers!: string[];

    @State((state) => state.company)
    private company!: string;

    @State((state) => state.user)
    private user!: User;

    @Action(CHANGE_SOUND)
    private changeSound!: (sound: boolean) => void;

    @Action(SELECT_SERIAL_NUMBER)
    private selectSerialNumber!: (serialNumber: string) => void;

    @Action(UPDATE_SYSTEM_CASES_SERIAL_NUMBERS)
    private updateSystemCaseSerialNumbers!: (serialNumber: string[]) => void;

    @Action(UPDATE_PC_SERIAL_NUMBERS)
    private updatePcSerialNumbers!: (serialNumber: string[]) => void;

    @Action(CHANGE_COMPANY)
    private changeCompany!: (company: string | null) => void;

    @Action(UPDATE_USER)
    private updateUser!: (user: User) => void;

    private isSoundOn = true;

    private nav = [
        { to: '/pkis', title: 'ПКИ' },
        { to: '/apkzi', title: 'АПКЗИ' },
        { to: '/systemCases', title: 'Системные блоки' },
        { to: '/pc', title: 'ПЭВМ' },
    ];

    @Watch('$route', { immediate: true, deep: true })
    private onUrlChange() {
        this.getSerialNumbers();
    }

    @Watch('systemCaseSerialNumbers')
    private changeSerialNumbers(): void {
        this.getSerialNumbers();
    }

    @Watch('selectedSerialNumber')
    private changeSelectedSerialNumber(): void {
        this.currentSn = this.selectedSerialNumber;
    }

    private get soundState() {
        this.isSoundOn = this.sound;
        return this.sound ? this.iconVolumeHigh : this.iconVolumeOff;
    }

    private onChangeSound(value: boolean): void {
        this.isSoundOn = value;
        this.changeSound(value);
    }

    private mounted() {
        this.getParts();
        this.getSerialNumbers();
        this.getCompany();
    }

    private getCompany(): void {
        const company = this.user.company;
        this.changeCompany(company);
        this.selectedCompany = company;
    }

    /**
     * Высота экрана
     * @private
     */
    private get innerHeight(): number {
        return window.innerHeight;
    }

    private get isMobile(): boolean {
        const breakpointName = this.$vuetify.breakpoint.name;
        return breakpointName === 'xs' || breakpointName === 'sm';
    }

    private get auth(): boolean {
        this.currentPart = sessionStorage.getItem('part');
        return (
            this.$route.name !== 'Login' &&
            sessionStorage.getItem('isAuth') === 'true'
        );
    }

    /**
     * Получаем темы
     * @private
     */
    private async getParts(): Promise<void> {
        this.parts = await partApi.getParts();
        this.currentPart = this.$store.state.part;
        this.getSerialNumbers();
    }

    /**
     * Получаем серийные номера
     * @private
     */
    private async getSerialNumbers(): Promise<void> {
        if (
            this.$route.path === '/systemCases' ||
            this.$route.path === '/assembly'
        ) {
            this.serialNumbers = this.systemCaseSerialNumbers;
        } else if (this.$route.path === '/pc') {
            this.serialNumbers = this.pcSerialNumbers;
        }
        if (this.serialNumbers.length !== 0) {
            this.currentSn = this.serialNumbers.includes(
                this.selectedSerialNumber
            )
                ? this.selectedSerialNumber
                : this.serialNumbers[0];
            this.selectSerialNumber(this.currentSn);
        }
    }

    /**
     * Изменить тему
     * @param part
     */
    public async changeCurrentPartValue(part: Part): Promise<void> {
        const oldPart = sessionStorage.getItem('part');
        // из комбобокса vuetify при создании приходит стринг, а при выборе объект
        // по этому костылим
        if (typeof part === 'string') {
            const newPart = new Part();
            newPart.part = part;
            part = newPart;
        }
        try {
            const newPart = await partApi.changePart(part.part);
            this.currentPart = newPart.part;
            const systemCaseSerialNumbers =
                await systemCaseApi.getSerialNumbers();
            this.updateSystemCaseSerialNumbers(systemCaseSerialNumbers);
            const pcSerialNumbers = await pcApi.getSerialNumbers();
            this.updatePcSerialNumbers(pcSerialNumbers);
            this.selectSerialNumber(null);
            sessionStorage.setItem('part', part.part);
            this.$store.commit('updatePart', part.part);
            await this.getParts();
        } catch (e) {
            this.$message.error('Ошибка сервера');
            this.currentPart = oldPart;
        }
    }

    /**
     * Отображать ли селект с серийными номерами
     * @private
     */
    private get isPcOrSystemCase(): boolean {
        const acceptRoutes = ['/systemCases', '/pc', '/assembly'];
        return acceptRoutes.includes(this.$route.path);
    }

    private changeSerialNumber(serialNumber: string): void {
        this.selectSerialNumber(serialNumber);
    }

    private async onChangeCompany(value: string): Promise<void> {
        this.changeCompany(value);
        const modifiedUser = this.user;
        modifiedUser.company = value;
        const user = await authApi.updateUser(modifiedUser);
        this.updateUser(user);
    }
}
