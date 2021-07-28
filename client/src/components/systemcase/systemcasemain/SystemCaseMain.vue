<template>
    <div>
        <div style="border-bottom: thin solid #c5c5c5fc;">
            <v-row align="center" class="justify-space-around">
                <v-col>
                    <v-btn elevation="4" color="primary" class="ml-6 d-none d-lg-flex d-xl-flex">
                        Добавить системный блок
                    </v-btn>
                    <v-btn
                        class="mx-2 d-flex d-md-flex d-lg-none"
                        fab
                        dark
                        small
                        color="primary"
                    >
                        <v-icon dark>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </v-col>
                <v-col>
                    <pagination
                        :items="systemCases"
                        :pages="6"
                        @changePage="changePage"
                    ></pagination>
                </v-col>
            </v-row>
        </div>
        <v-data-iterator
            ref="iterator"
            :items="systemCases"
            :items-per-page.sync="itemsPerPage"
            :footer-props="footerProps"
            :page.sync="page"
            items-per-page-all-text="Количество"
            style="height: calc(100vh - 133px); overflow: auto"
            height="calc(100vh - 214px)"
            :show-current-page="true"
        >

            <template v-slot:default="props">
                <v-card
                    style="padding-bottom: 1px"
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
