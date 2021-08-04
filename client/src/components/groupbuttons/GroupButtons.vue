<template>
    <v-row class="mt-2 mb-2 justify-space-between">
        <div>
            <v-btn class="ml-6" elevation="3" small text color="blue lighten-2"
                ><v-icon class="icon">mdi-content-copy</v-icon>Копировать</v-btn
            >
            <v-btn class="ml-6" elevation="3" small text color="teal lighten-2">
                <v-icon class="icon">mdi-pencil-outline</v-icon>
                Редактировать</v-btn
            >
        </div>
        <div>
            <v-btn
                class="mr-6"
                elevation="3"
                small
                text
                color="deep-orange darken-1"
                @click="doRemove"
                ><v-icon class="icon">mdi-trash-can-outline</v-icon
                >Удалить</v-btn
            >
        </div>
    </v-row>
</template>

<script src="./GroupButtons.ts" lang="ts"></script>

<style scoped>
.icon {
    font-size: 16px;
    margin-right: 5px;
}
</style>
