<template>
    <v-menu :offset-y="true" top :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                text
                small
                elevation="3"
                v-bind="attrs"
                v-on="on"
            >
                Выбрать цвет
            </v-btn>
        </template>
        <v-color-picker
            class="ma-2"
            :swatches="swatches"
            hide-mode-switch
            show-swatches
            hide-inputs
        ></v-color-picker>
    </v-menu>
</template>

<script src="./ColorPicker.ts" lang="ts"></script>

<style scoped>

</style>
