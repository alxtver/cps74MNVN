<template>
<div>
    <v-row
        align="center"
        style="height: 80px; justify-content: space-between"
    >
        <div>
            <add-pc
                @addPc="addNewPc"
                :serialNumbers="allSerialNumbers"
            ></add-pc>
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
                :items="pc"
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
        :items="pc"
        :items-per-page.sync="itemsPerPage"
        :hide-default-footer="true"
        :page.sync="page"
    >
        <template v-slot:default="props">
            <v-col>
                <div
                    style="padding-bottom: 1px"
                    v-for="item in props.items"
                    :key="item._id"
                >
                    <pc-form
                        :serialNumbers="allSerialNumbers"
                        :pc="item"
                        @updateSystemCase="updateSystemCase"
                        @doRemove="removePc"
                        @addPc="addPc"
                    ></pc-form>
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

<script src="./PcMain.ts" lang="ts"></script>

<style scoped>

</style>
