<template>
    <div class="system-case-card mb-4 mt-4 ml-4 mr-4" :style="systemCaseColor">
        <v-card
            elevation="10"
            style="background: #fff; padding: 0 10px 10px 10px"
        >
            <system-case-table
                :systemCase="systemCase"
                @updateSystemCase="updateSystemCase"
            ></system-case-table>
            <group-buttons
                item="systemCase"
                @doRemove="removeSystemCase"
                @doEdit="doEdit"
                @doCopy="doCopy"
            ></group-buttons>
        </v-card>
        <edit-system-case
            ref="editSystemCase"
            :openDialog="openEditDialog"
            :systemCase="systemCase"
            @editSystemCase="editSystemCase"
            @close="closeEditDialog"
        ></edit-system-case>
        <copy-form
            ref="copySystemCase"
            title="Копирование системных блоков"
            :serialNumbers="serialNumbers"
            :currentSerialNumber="systemCase.serialNumber"
            @copy="copySystemCases"
        ></copy-form>
    </div>
</template>

<script src="./SystemCaseForm.ts" lang="ts"></script>

<style lang="scss" scoped>
.system-case-card {
    padding: 15px;
}
</style>
