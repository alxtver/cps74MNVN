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
