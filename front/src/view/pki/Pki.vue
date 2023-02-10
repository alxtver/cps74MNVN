<template>
    <pki-table />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PkiTable from '@/view/pki/pkitable/PkiTable.vue';

export default defineComponent({
    name: 'Pki',
    components: { PkiTable },
    methods: {
        clickOnDiv(): void {}
    }
});
</script>

<style scoped></style>
