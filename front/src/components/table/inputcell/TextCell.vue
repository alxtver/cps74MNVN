<template>
    <el-input
        v-model="localValue"
        size="small"
        ref="input"
        @keydown.enter="onKeydown"
        @keydown.tab="onKeydown"
        @blur="onBlur"
    />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { InputInstance } from "element-plus";

export default defineComponent({
    name: "TextCell",
    data() {
        return { localValue: "" };
    },
    props: ["value"],
    async mounted() {
        await (this.$refs.input as InputInstance).focus();
        this.localValue = structuredClone(this.value);
    },
    methods: {
        onKeydown(evt: KeyboardEvent) {
            const key = evt.key;
            switch (key) {
                case "Enter": {
                    this.$emit("enter", evt);
                    break;
                }
                case "Tab": {
                    this.$emit("tab", evt);
                    break;
                }
                case "Esc": {
                    this.$emit("esc", evt);
                }
            }
        },
        onBlur(evt: FocusEvent) {
            this.$emit("blur", evt);
        },
    },
    emits: {
        enter(evt: KeyboardEvent) {
            return evt;
        },
        blur(evt: FocusEvent) {
            return evt;
        },
        tab(evt: KeyboardEvent) {
            return evt;
        },
        esc(evt: KeyboardEvent) {
            return evt;
        },
        change(value: string) {
            return value;
        },
    },
});
</script>

<style scoped></style>
