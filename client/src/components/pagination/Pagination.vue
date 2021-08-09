<template>
    <v-pagination
        :value="page"
        class="pagination"
        :length="pages"
        :total-visible="5"
        @input="changePage"
    ></v-pagination>
</template>

<script src="./Pagination.ts" lang="ts"></script>

<style scoped>

</style>
