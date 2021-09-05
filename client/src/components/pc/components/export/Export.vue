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
            >
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon dark v-bind="attrs" v-on="on">
                            mdi-file-word-outline
                        </v-icon>
                    </template>
                    <span>Экспорт в Word</span>
                </v-tooltip>
            </v-btn>
        </template>
        <export-form @close="dialog = false"></export-form>
    </v-dialog>
</template>

<script src="./Export.ts"></script>

<style scoped>

</style>
