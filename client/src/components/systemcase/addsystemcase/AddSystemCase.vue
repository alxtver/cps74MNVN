<template>
    <v-dialog v-model="dialog" max-width="1000px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="ml-6 mx-2"
                fab
                dark
                small
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="resetValidation"
            >
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon dark v-bind="attrs" v-on="on">
                            mdi-plus
                        </v-icon>
                    </template>
                    <span>Добавить системный блок</span>
                </v-tooltip>
            </v-btn>
        </template>
        <add-system-case-card
            ref="addSystemCaseCard"
            :serialNumbers="serialNumbers"
            @saveSystemCase="addSystemCase"
            @close="dialog = false"
        ></add-system-case-card>
    </v-dialog>
</template>

<script src="./AddSystemCase.ts" lang="ts"></script>

<style scoped></style>
