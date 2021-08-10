<template>
    <div>
        <v-row
            align="center"
            style="height: 80px; justify-content: space-between"
        >
            <div>
                <add-system-case
                    @addSystemCase="addSystemCase"
                    :serialNumbers="allSerialNumbers"
                ></add-system-case>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn to="/assembly" fab dark small color="success">
                            <v-icon dark v-bind="attrs" v-on="on">
                                mdi-wrench-outline
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Сборка системных блоков</span>
                </v-tooltip>
            </div>
            <div style="display: flex; align-items: center; margin-right: 20px">
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
                            :serialNumbers="allSerialNumbers"
                            :systemCase="item"
                            @updateSystemCase="updateSystemCase"
                            @doRemove="removeSystemCase"
                            @addSystemCases="addSystemCases"
                        ></system-case-form>
                    </div>
                </v-col>
            </template>
        </v-data-iterator>
        <v-overlay :value="overlay" :opacity="0.8">
            <v-progress-circular
                indeterminate
                :size="70"
                :width="7"
                color="deep-orange lighten-2"
            ></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script src="./SystemCaseMain.ts"></script>

<style scoped>
.count-pages {
    width: 150px;
}
</style>
