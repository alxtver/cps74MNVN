import { defineComponent } from "vue";
import PartApi from "@/api/PartApi";
import type Part from "@/models/Part";
import router from "@/router";

/**
 * Компонент меню
 */
export default defineComponent({
  data() {
    return {
      parts: [] as Part[],
      currentPart: null as null | Part,
      activeIndex: "pki",
    };
  },
  methods: {
    /**
     * Загрузка тем
     */
    async loadParts(): Promise<void> {
      this.parts = await PartApi.getParts();
    },
    /**
     * Переход по пунктам меню
     * @param index
     */
    handleSelect(index: string): void {
      router.push(index).then();
    },

    /**
     * Выбор темы
     */
    onSelectPart(partId: string): void {
      const selectedPart = this.parts.find(
        (part: Part): boolean => part._id === partId
      );
      if (selectedPart) {
        this.$store.dispatch("updatePart", selectedPart.part);
      }
    },
  },
  created() {
    this.activeIndex = router.options.history.location.replace("/", "");
    this.loadParts().then();
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    current(): Part {
      return this.$store.getters.getPart;
    },
  },
});
