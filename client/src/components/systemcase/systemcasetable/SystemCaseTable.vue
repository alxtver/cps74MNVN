<template>
    <v-data-table
        class="elevation-10 pki-table"
        dense
        :headers="headers"
        :items="systemCase.systemCaseUnits"
        :hide-default-footer="true"
        :items-per-page="-1"
        item-key="i"
        :single-select="true"
        
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <div>ФДШИ.{{systemCase.fdsi}}</div>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <div style="padding: 10px; font-size: x-large; height: 100%">{{systemCase.serialNumber}}</div>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <div v-if="systemCase.numberMachine" style="padding: 10px;">{{systemCase.numberMachine}}</div>
                <v-divider
                    v-if="systemCase.numberMachine"
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
            </v-toolbar>
        </template>
        <template v-slot:item.serial_number="props">
            <v-edit-dialog
                :return-value.sync="props.item.serial_number"
                light
                transition="scale-transition"
                @save="insertSerialNumber(props)"
                @cancel="cancel"
                @close="cancel"
                
            >
                <div @click="test">{{ props.item.serial_number }}</div>
                <template v-slot:input>
                    <v-text-field
                        class="edit-dialog"
                        v-model="props.item.serial_number"
                        label="Edit"
                        single-line
                        autofocus
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
    </v-data-table>
</template>

<script src="./SystemCaseTable.ts"></script>

<style lang="scss" >
.systemCaseHeader {
    background: #3d3d3d;
    color: #d5d5d5 !important;
}
.pki-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 28px !important;
}
.v-text-field__details {
    display: none;
}
.v-small-dialog__content {
    .v-text-field {
        margin-top: 0 !important;
        padding-top: 0 !important;
    }
}
</style>

<style lang="scss" scoped>
.edit-dialog{

}
</style>
