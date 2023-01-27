<template>
    <v-card style="padding: 15px">
        <v-select
            class="part-select ml-2 mt-3"
            dense
            v-model="currentDocument"
            label="Документ"
            :menu-props="{ offsetY: true }"
            :items="documents"
        />
    
        <v-select
            class="part-select ml-2 mt-3"
            dense
            v-model="firstPc"
            label="Первый ПЭВМ"
            :menu-props="{ offsetY: true }"
            :items="pcSerialNumbers"
            @change="onChangeFirstPc"
        />
    
        <v-select
            class="part-select ml-2 mt-3"
            dense
            v-model="lastPc"
            label="Последний ПЭВМ"
            :menu-props="{ offsetY: true }"
            :items="pcSerialNumbers"
            @change="onChangeLastPc"
        />
        
        
        <v-divider class="mt-3 mb-3"></v-divider>
        <v-btn elevation="3" color="deep-orange darken-1" text @click="chancel">
            Отмена
        </v-btn>
        <v-btn
            class="ml-4"
            elevation="3"
            color="blue darken-1"
            text
            @click="doExport"
        >
            Экспорт
        </v-btn>
    </v-card>
</template>

<script src="./ExportForm.ts"></script>

<style scoped></style>
