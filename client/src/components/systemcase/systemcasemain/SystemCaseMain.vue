<template>
    <div>
        <div style="border-bottom: thin solid #c5c5c5fc">
            <v-row align="center" class="justify-space-around">
                <v-col>
                    <add-system-case
                        @addSystemCase="addSystemCase"
                        :serialNumbers="allSerialNumbers"
                    ></add-system-case>
                </v-col>
                <v-col>
                    <pagination
                        :items="systemCases"
                        :pages="countPages"
                        @changePage="changePage"
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                    ></pagination>
                </v-col>
            </v-row>
        </div>
        <v-data-iterator
            ref="iterator"
            items-per-page-all-text="Количество"
            style="height: calc(100vh - 133px); overflow: auto"
            height="calc(100vh - 214px)"
            :items="systemCases"
            :items-per-page.sync="itemsPerPage"
            :footer-props="footerProps"
            :page.sync="page"
            :show-current-page="true"
            :loading="loading"
        >
            <template v-slot:default="props">
                <v-card
                    style="padding-bottom: 1px"
                    v-for="item in props.items"
                    :key="item._id"
                >
                    <system-case-form
                        :systemCase="item"
                        @updateSystemCase="updateSystemCase"
                        @doRemove="removeSystemCase"
                    ></system-case-form>
                </v-card>
            </template>
        </v-data-iterator>
    </div>
</template>

<script src="./SystemCaseMain.ts"></script>

<style scoped></style>
