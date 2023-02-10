import { defineComponent } from "vue";
import type { InputInstance } from "element-plus";

export default defineComponent({
    name: "TextCell",
    data() {
        return { localValue: "" };
    },
    async mounted() {
        await (this.$refs.input as InputInstance).focus();
    },
    methods: {
        onKeydown(evt: KeyboardEvent) {
            evt.preventDefault();
            const key = evt.key
            switch (key) {
                case 'Enter': {
                    this.$emit('enter', evt)
                }
            }
        }
    },
});
