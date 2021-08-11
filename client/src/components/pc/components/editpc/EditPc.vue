<template>
    <v-dialog v-model="dialog" max-width="1000px" persistent>
        <add-pc-card
            ref="addPcCard"
            :serialNumbers="serialNumbers"
            :pc="pc"
            :isNewPc="false"
            @savePc="editPc"
            @close="closeDialog"
        ></add-pc-card>
    </v-dialog>
</template>

<script src="./EditPc.ts" lang="ts"></script>

<style scoped>

</style>
