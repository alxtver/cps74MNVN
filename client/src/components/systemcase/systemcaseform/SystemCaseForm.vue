<template>
    <div class="system-case-card mb-4 mt-4 ml-4 mr-4" :style="systemCaseColor">
        <v-card
            style="
                background: #fff;
                padding: 0 10px 10px 10px;
                box-shadow: #000 2px 4px 13px 0, #0000000f 0 12px 7px 8px;
            "
        >
            <system-case-table
                ref="table"
                :systemCase="systemCase"
                @painting="painting"
                @updateSystemCase="updateSystemCase"
            ></system-case-table>
            <group-buttons
                item="systemCase"
                v-if="$route.path === '/systemCases'"
                @doRemove="removeSystemCase"
                @doEdit="doEdit"
                @doCopy="doCopy"
            ></group-buttons>
        </v-card>
        <edit-system-case
            ref="editSystemCase"
            v-if="$route.path === '/systemCases'"
            :openDialog="openEditDialog"
            :systemCase="systemCase"
            @editSystemCase="editSystemCase"
            @close="closeEditDialog"
        ></edit-system-case>
        <copy-form
            ref="copySystemCase"
            v-if="$route.path === '/systemCases'"
            title="Копирование системных блоков"
            :serialNumbers="serialNumbers"
            :currentSerialNumber="systemCase.serialNumber"
            @copy="copySystemCases"
        ></copy-form>
    </div>
</template>

<script src="./SystemCaseForm.ts" lang="ts"></script>

<style lang="scss">
.system-case-card {
    padding: 10px;
    box-shadow: rgb(0 0 0) 2px 4px 13px 0, rgb(0 0 0 / 6%) 0 12px 7px 8px;
}
</style>
