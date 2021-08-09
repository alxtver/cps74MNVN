import Vue from 'vue';
import partApi from '@/api/PartApi';
import Component from 'vue-class-component';
import Part from '@/models/Part';
import { mdiCog, mdiVolumeHigh, mdiVolumeOff } from '@mdi/js';
import { Action, State } from 'vuex-class';
import { CHANGE_SOUND, SELECT_SERIAL_NUMBER } from '@/store';
import { Watch } from 'vue-property-decorator';

@Component
export default class MainMenu extends Vue {
    private currentPart = '';
    private parts: Part[] = [];
    private drawer = false;
    private iconCog = mdiCog;
    private iconVolumeHigh = mdiVolumeHigh;
    private iconVolumeOff = mdiVolumeOff;
    private volume = true;
    private selectedItem = 0;
    private currentSn: string | null = null;
    private serialNumbers: string[] = [];

    @State((state) => state.sound)
    private sound!: boolean;

    @State((state) => state.systemCasesSerialNumbers)
    private systemCaseSerialNumbers!: string[];

    @State((state) => state.selectedSerialNumber)
    private selectedSerialNumber!: string;

    @State((state) => state.pcSerialNumbers)
    private pcSerialNumbers!: string[];

    @Action(CHANGE_SOUND)
    private changeSound!: (sound: boolean) => void;

    @Action(SELECT_SERIAL_NUMBER)
    private selectSerialNumber!: (serialNumber: string) => void;

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

    private get soundState() {
        return this.sound ? this.iconVolumeHigh : this.iconVolumeOff;
    }

    private changeItem(values): void {
        this.volume = values.includes('volume');
        this.changeSound(!this.sound);
    }

    private mounted() {
        this.getParts();
        this.getSerialNumbers();
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
        if (this.$route.path === '/systemCases') {
            this.serialNumbers = this.systemCaseSerialNumbers;
        } else if (this.$route.path === '/pc') {
            this.serialNumbers = this.pcSerialNumbers;
        }
        if (this.serialNumbers.length !== 0 ){
            this.currentSn = this.serialNumbers.includes(this.selectedSerialNumber)
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
        if (typeof part === "string") {
            const newPart = new Part();
            newPart.part = part;
            part = newPart;
        }
        try {
            const newPart = await partApi.changePart(part.part);
            this.currentPart = newPart.part;
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
        return (
            this.$route.path === '/systemCases' || this.$route.path === '/pc'
        );
    }

    private changeSerialNumber(serialNumber: string): void {
        this.selectSerialNumber(serialNumber);
    }
}
