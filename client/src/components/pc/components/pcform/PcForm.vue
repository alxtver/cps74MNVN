<template>
    <div class="system-case-card mb-4 mt-4 ml-4 mr-4" :style="pcColor">
        <v-card
            style="background: #fff; padding: 0 10px 10px 10px; box-shadow: #000 2px 4px 13px 0, #0000000f 0 12px 7px 8px;"
        >
            <pc-table
                :pc="pc"
                @updatePc="updatePc"
            ></pc-table>
            <pc-table
                v-if="pc.system_case_unit.length !== 0"
                class="mt-4"
                unit="systemCaseUnit"
                :pc="pc"
                @updatePc="updatePc"
            ></pc-table>
            <group-buttons
                item="pc"
                @doRemove="removePc"
                @doEdit="doEdit"
                @doCopy="doCopy"
            ></group-buttons>
        </v-card>
        <edit-pc
            ref="editPc"
            :openDialog="openEditDialog"
            :pc="pc"
            @editPc="editPc"
            @close="closeEditDialog"
        ></edit-pc>
        <copy-form
            ref="copyPc"
            v-if="$route.path === '/systemCases' || $route.path === '/pc'"
            title="Копирование ПЭВМ"
            :serialNumbers="serialNumbers"
            :currentSerialNumber="pc.serial_number"
            @copy="copyPc"
        ></copy-form>
    </div>
</template>

<script src="./PcForm.ts" lang="ts"></script>

<style scoped>

</style>
