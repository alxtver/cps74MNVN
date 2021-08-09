import Vue from 'vue';
import partApi from '@/api/PartApi';
import Component from 'vue-class-component';
import Part from '@/models/Part';
import { mdiCog, mdiVolumeHigh, mdiVolumeOff } from '@mdi/js';
import { Action, State } from 'vuex-class';
import { CHANGE_SOUND, SELECT_SERIAL_NUMBER } from '@/store';
import systemCaseApi from "@/api/SystemCaseApi";
import {Watch} from "vue-property-decorator";

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
            this.serialNumbers = await systemCaseApi.getSerialNumbers()
            this.currentSn = this.serialNumbers[0];
        }
    }

    /**
     * Изменить тему
     * @param part
     */
    public async changeCurrentPartValue(part: string): Promise<void> {
        const oldPart = sessionStorage.getItem('part');
        try {
            const newPart = await partApi.changePart(part);
            this.currentPart = newPart.part;
            sessionStorage.setItem('part', part);
            this.$store.commit('updatePart', part);
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
