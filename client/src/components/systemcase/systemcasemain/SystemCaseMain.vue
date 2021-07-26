<template>
    <div>
        <pagination :items="systemCases" @changePage="changePage"></pagination>
        <v-data-iterator
            ref="iterator"
            :items="systemCases"
            :items-per-page.sync="itemsPerPage"
            :footer-props="footerProps"
            :page.sync="page"
            items-per-page-all-text="Количество"
            style="height: calc(100vh - 88px); overflow: auto"
            height="calc(100vh - 214px)"
            :show-current-page="true"
        >
            <template v-slot:default="props">
                <v-card
                    class="mb-4 mt-4 ml-4 mr-4"
                    v-for="item in props.items"
                    :key="item._id"
                >
                    <system-case-form :systemCase="item"></system-case-form>
                </v-card>
            </template>
        </v-data-iterator>
    </div>
</template>

<script src="./SystemCaseMain.ts"></script>

<style scoped></style>
