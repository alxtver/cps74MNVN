import Vue from "vue";
import partApi from "@/api/PartApi";
import Component from "vue-class-component";
import Part from "@/models/Part";
import { mdiCog, mdiVolumeHigh, mdiVolumeOff } from '@mdi/js';
import {Action, State} from "vuex-class";
import {CHANGE_SOUND} from "@/store";

@Component
export default class MainMenu extends Vue {
  private currentPart = "";
  private parts: Part[] = [];
  private drawer = false;
  private iconCog = mdiCog;
  private iconVolumeHigh = mdiVolumeHigh;
  private iconVolumeOff = mdiVolumeOff;
  private volume = true;
  private selectedItem = 0

  @State(state => state.sound)
  private sound!: boolean;

  @Action(CHANGE_SOUND)
  private changeSound!: (
      sound: boolean
  ) => void;

  private test(a) {
    debugger
  }

  private get soundState() {
    return this.sound ? this.iconVolumeHigh : this.iconVolumeOff;
  }

  private changeItem(values): void {
    this.volume = values.includes('volume');
    this.changeSound(!this.sound)
  }

  private mounted() {
    this.getParts();
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
    return breakpointName === "xs" || breakpointName === "sm";
  }

  private get auth(): boolean {
    this.currentPart = sessionStorage.getItem("part");
    return (
      this.$route.name !== "Login" &&
      sessionStorage.getItem("isAuth") === "true"
    );
  }

  private handleSelect(key: number, keyPath: Array<string>) {
    console.log(key, keyPath);
  }

  /**
   * Получаем темы
   * @private
   */
  private async getParts(): Promise<void> {
    this.parts = await partApi.getParts();
    this.currentPart = this.$store.state.part;
  }

  private changeTab(): void {
    const html: HTMLHtmlElement = document.querySelector("html");
    html.style.overflowY = "hidden";
    setTimeout(() => {
      html.style.overflowY = "auto";
    }, 200);
  }

  /**
   * Изменить тему
   * @param part
   */
  public async changeCurrentPartValue(part: string): Promise<void> {
    const oldPart = sessionStorage.getItem("part");
    try {
      const newPart = await partApi.changePart(part);
      this.currentPart = newPart.part;
      sessionStorage.setItem("part", part);
      this.$store.commit("updatePart", part);
    } catch (e) {
      this.$message.error("Ошибка сервера");
      this.currentPart = oldPart;
    }
  }
}
