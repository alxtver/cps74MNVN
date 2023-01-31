import TextComponent from "@/components/test/TextComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pki",
  components: { TextComponent },
  methods: {
    clickOnDiv(): void {
      const textComp = this.$refs.text as TextComponent;
      textComp.testMethod();
    },
  },
});
