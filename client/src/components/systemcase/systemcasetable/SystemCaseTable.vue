<template>
    <v-data-table
        class="elevation-10 pki-table"
        dense
        :headers="headers"
        :items="systemCaseUnits"
        :hide-default-footer="true"
        :items-per-page="-1"
        item-key="i"
    ></v-data-table>
</template>

<script src="./SystemCaseTable.ts"></script>

<style lang="scss" >
.systemCaseHeader {
    background: #3d3d3d;
    color: #d5d5d5 !important;
}
</style>
