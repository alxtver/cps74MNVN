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
                    <span>Добавить ПЭВМ</span>
                </v-tooltip>
            </v-btn>
        </template>
        <add-pc-card
            ref="addPcCard"
            :serialNumbers="serialNumbers"
            @savePc="addPc"
            @close="dialog = false"
        ></add-pc-card>
    </v-dialog>
</template>

<script src="./AddPc.ts"></script>

<style scoped>

</style>
