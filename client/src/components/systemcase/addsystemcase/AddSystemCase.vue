<template>
    <v-dialog
        v-model="dialog"
        max-width="1000px"
        persistent
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                elevation="4"
                color="primary"
                class="ml-6 d-none d-lg-flex d-xl-flex"
                v-bind="attrs"
                v-on="on"
            >
                Добавить системный блок
            </v-btn>
            <v-btn
                class="mx-2 d-flex d-md-flex d-lg-none"
                fab
                dark
                small
                color="primary"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon dark> mdi-plus </v-icon>
            </v-btn>
        </template>
        <add-system-case-card @chancel="dialog = false"></add-system-case-card>
    </v-dialog>
</template>

<script src="./AddSystemCase.ts" lang="ts"></script>

<style scoped>

</style>
