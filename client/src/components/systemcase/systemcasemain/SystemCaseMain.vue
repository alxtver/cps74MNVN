<template>
    <div>
        <v-row align="center" style="height: 80px; justify-content: space-between;">
            <add-system-case
                @addSystemCase="addSystemCase"
                :serialNumbers="allSerialNumbers"
            ></add-system-case>
            <div style="display: flex; align-items: center; margin-right: 20px;">
                <div class="count-pages">
                    <v-select
                        v-model="itemsPerPage"
                        item-text="key"
                        item-value="value"
                        label="Количество на странице"
                        dense
                        :items="listCountPages"
                    ></v-select>
                </div>
                <pagination
                    :items="systemCases"
                    :pages="countPages"
                    :page="page"
                    @changePage="changePage"
                    @nextPage="nextPage"
                    @previousPage="previousPage"
                ></pagination>
            </div>
        </v-row>
        <v-data-iterator
            ref="iterator"
            :items="systemCases"
            :items-per-page.sync="itemsPerPage"
            :hide-default-footer="true"
            :page.sync="page"
            :loading="loading"
        >
            <template v-slot:default="props">
                <v-col>
                    <div
                        style="padding-bottom: 1px"
                        v-for="item in props.items"
                        :key="item._id"
                    >
                        <system-case-form
                            :systemCase="item"
                            @updateSystemCase="updateSystemCase"
                            @doRemove="removeSystemCase"
                        ></system-case-form>
                    </div>
                </v-col>
            </template>
        </v-data-iterator>
    </div>
</template>

<script src="./SystemCaseMain.ts"></script>

<style scoped>
.count-pages {
    width: 150px;
}
</style>
