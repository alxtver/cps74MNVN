<template>
    <el-input
        placeholder="Поиск..."
        prefix-icon="el-icon-search"
        v-model="search"
        class='search-field'
        :style="getStyles()"
        @input='onInput'
    />
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';

interface SearchFieldProperties {
    width: number;
}

const props = withDefaults(defineProps<SearchFieldProperties>(), {
    width: 300,
});
const { width } = toRefs(props);

const emit = defineEmits(['input']);

const search = ref('');

function getStyles(): { width: string } {
    return { width: `${width.value}px` };
}

function onInput(): void {
    emit('input', search.value);
}
</script>

<style scoped>
.search-field {
    margin-bottom: 5px;
}
</style>
