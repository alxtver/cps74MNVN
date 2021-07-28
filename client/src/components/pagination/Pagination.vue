<template>
    <v-pagination
        v-model="page"
        class="pagination"
        :length="pages"
        :total-visible="7"
        @input="changePage"
    ></v-pagination>
</template>

<script src="./Pagination.ts" lang="ts"></script>

<style scoped>

</style>
