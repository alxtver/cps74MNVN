import { defineComponent } from "vue";
export default defineComponent({
  name: "TextComponent",
  data() {
    return { value: "Какой-то текст" };
  },
  methods: {
    testMethod(): void {
      this.value += "!!!";
    },
  },
});