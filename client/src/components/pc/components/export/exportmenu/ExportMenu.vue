<template>
    <v-menu left bottom :offset-y="true">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item @change="exportPassport">
                <v-list-item-title v-text="'Паспорт'"></v-list-item-title>
            </v-list-item>
            <v-list-item @change="exportSystemCaseZip">
                <v-list-item-title
                    v-text="'Системный блок ЗИП'"
                ></v-list-item-title>
            </v-list-item >
            <v-list-item  @change="exportZipLabel">
                <v-list-item-title v-text="'ЗИП этикетка'"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script src="./ExportMenu.ts"></script>

<style scoped></style>
