<template>
    <v-dialog v-model="dialog" max-width="1000px" persistent>
        <add-system-case-card
            ref="addSystemCaseCard"
            :serialNumbers="serialNumbers"
            :systemCase="systemCase"
            :isNewSystemCase="false"
            @saveSystemCase="editSystemCase"
            @close="closeDialog"
        ></add-system-case-card>
    </v-dialog>
</template>

<script src="./EditSystemCase.ts" lang="ts"></script>

<style scoped></style>
