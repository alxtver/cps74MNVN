<template>
    <div class="text-center">
        <v-pagination
            v-model="page"
            class="pagination"
            :length="15"
            :total-visible="7"
            @input="changePage"
            @keyup.f1.prevent="test()"
        ></v-pagination>
    </div>
</template>

<script src="./Pagination.ts" lang="ts"></script>

<style scoped>
    .pagination {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 48px;
        z-index: 700;
    }
</style>
