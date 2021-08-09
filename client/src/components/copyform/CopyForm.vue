<template>
    <v-dialog v-model="dialog" class="mx-auto my-12" max-width="500">
        <v-card>
            <v-card-title>
                {{ title }}
            </v-card-title>
            <div style="padding: 10px">
                <v-text-field
                    v-model="firstSerialNumber"
                    label="Первый номер"
                    @input="changeFirst"
                ></v-text-field>
                <v-text-field
                    v-model="lastSerialNumber"
                    label="Последний номер"
                    @input="changeLast"
                ></v-text-field>
                <v-text-field
                    class="input-count"
                    :rules="[rules.number, rules.counter]"
                    v-model="count"
                    label="Количество"
                    suffix="шт."
                    @input="changeCount"
                ></v-text-field>
            </div>

            <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Отмена
                </v-btn>
                <v-btn color="blue darken-1" text @click="copy" :disabled="disableCopy">
                    Копировать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script src="./CopyForm.ts" lang="ts"></script>

<style scoped></style>

<style lang="scss">
.input-count {
    .v-text-field__details {
        display: block;
    }
}
</style>
