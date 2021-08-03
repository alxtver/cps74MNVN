<template>
    <v-form class="pki-card-form" ref="form" v-model="valid" lazy-validation>
    <div style="display: flex; gap: 10px">
        <v-text-field
            v-model="systemCase.part"
            label="Проект"
            dense
            outlined
            disabled
        ></v-text-field>
        
        <v-text-field
            v-model="systemCase.fdsi"
            label="ФДШИ."
            dense
            outlined
        ></v-text-field>
        
        <v-text-field
            v-model="systemCase.serialNumber"
            label="Серийный номер"
            dense
            outlined
        ></v-text-field>
        <v-text-field
            v-model="systemCase.execution"
            label="Исполнение"
            dense
            outlined
        ></v-text-field>
        <v-text-field
            v-model="systemCase.attachment"
            label="Приложение"
            dense
            outlined
        ></v-text-field>
        
    </div>
        
        
        <system-case-table
            ref="systemCaseTable"
            :systemCase="systemCase"
            :editSystemCase="true"
        >
        </system-case-table>
        <div class="mt-4" style="display: flex; gap: 5px">
            <v-btn
                elevation="3"
                text
                small
                @click="addRow"
                color="teal lighten-2"
                >Добавить строку</v-btn
            >
            <v-btn
                elevation="3"
                text
                small
                @click="removeRow"
                color="deep-orange darken-1"
                >Удалить строку</v-btn
            >
            <color-picker></color-picker>
        </div>
    
        <v-divider class="mt-3 mb-3"></v-divider>
        <v-btn elevation="3" color="deep-orange darken-1" text @click="chancel">
            Отмена
        </v-btn>
        <v-btn class="ml-4" elevation="3" color="blue darken-1" text @click="save">
            Сохранить
        </v-btn>
    </v-form>
</template>

<script src="./AddSystemCaseCard.ts" lang="ts"></script>

<style scoped></style>
