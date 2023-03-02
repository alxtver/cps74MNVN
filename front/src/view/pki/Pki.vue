<template>
    <div class='w-full h-screen overflow-auto'>
        <pki-table />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PkiTable from '@/view/pki/pkitable/PkiTable.vue';
import FastPkiTable from "@/view/pki/pkitable/FastPkiTable.vue";

export default defineComponent({
    name: 'Pki',
    components: { FastPkiTable, PkiTable },
    methods: {
        clickOnDiv(): void {}
    }
});
</script>

<style scoped></style>
