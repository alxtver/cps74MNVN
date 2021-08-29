<template>
    <v-data-table
        ref="table"
        v-if="systemCase"
        :class="{'pki-table': $route.path !== '/assembly', 'assembly-table': $route.path === '/assembly'}"
        dense
        v-model="selected"
        :headers="$route.path === '/systemCases'? headers : headersForAssembly"
        :items="systemCase.systemCaseUnits"
        :hide-default-footer="true"
        :items-per-page="-1"
        item-key="i"
        :item-class="itemClass"
        :show-select="editSystemCase"
        @click:row="onSelectRow"
    >
        <template v-if="!editSystemCase && $route.path === '/systemCases'" v-slot:top>
            <v-toolbar flat>
                <div style="display: flex; align-items: center">
                    <div>{{ systemCase.fdsi }}</div>

                    <v-divider class="mx-4" inset vertical></v-divider>
                    <div
                        :id="systemCase.serialNumber"
                        style="padding: 10px; font-size: x-large; height: 100%"
                    >
                        № {{ systemCase.serialNumber }}
                    </div>

                    <v-divider
                        v-if="systemCase.execution"
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <div v-if="systemCase.execution" style="padding: 10px">
                        Исполнение: {{ systemCase.execution }}
                    </div>

                    <v-divider
                        v-if="systemCase.attachment"
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <div v-if="systemCase.attachment" style="padding: 10px">
                        Приложение: {{ systemCase.attachment }}
                    </div>

                    <v-divider
                        v-if="systemCase.numberMachine"
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <div v-if="systemCase.numberMachine">
                        ПЭВМ {{ systemCase.numberMachine }}
                    </div>
                </div>
            </v-toolbar>
        </template>

        <!-- обозначение изделия -->
        <template v-if="editSystemCase" v-slot:item.fdsi="props">
            <v-edit-dialog
                :return-value.sync="props.item.fdsi"
                light
                transition="scale-transition"
                @open="open(props.index)"
            >
                <div>{{ props.item.fdsi }}</div>
                <template v-slot:input>
                    <v-text-field
                        v-if="isEditableCell(props.item)"
                        class="edit-dialog"
                        v-model="props.item.fdsi"
                        single-line
                        autofocus
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
        <!-- наименование изделия -->
        <template v-if="editSystemCase" v-slot:item.type="props">
            <v-edit-dialog
                :return-value.sync="props.item.type"
                light
                transition="scale-transition"
                @open="open(props.index)"
            >
                <div>{{ props.item.type }}</div>
                <template v-slot:input>
                    <v-text-field
                        v-if="isEditableCell(props.item)"
                        class="edit-dialog"
                        v-model="props.item.type"
                        single-line
                        autofocus
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
        <!-- Характеристика -->
        <template v-if="editSystemCase" v-slot:item.name="props">
            <v-edit-dialog
                :return-value.sync="props.item.name"
                light
                transition="scale-transition"
                @open="open(props.index)"
            >
                <div>{{ props.item.name }}</div>
                <template v-slot:input>
                    <v-text-field
                        v-if="isEditableCell(props.item)"
                        class="edit-dialog"
                        v-model="props.item.name"
                        single-line
                        autofocus
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
        <!-- Количество -->
        <template v-if="editSystemCase" v-slot:item.quantity="props">
            <v-edit-dialog
                :return-value.sync="props.item.quantity"
                light
                transition="scale-transition"
                @open="open(props.index)"
            >
                <div>{{ props.item.quantity }}</div>
                <template v-slot:input>
                    <v-text-field
                        v-if="isEditableCell(props.item)"
                        class="edit-dialog"
                        v-model="props.item.quantity"
                        single-line
                        autofocus
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
        <!-- Заводской номер -->
        <template v-slot:item.serial_number="props">
            <v-edit-dialog
                :return-value.sync="props.item.serial_number"
                light
                transition="scale-transition"
                @save="insertSerialNumber(props)"
                @cancel="cancel"
                @open="open(props.index)"
            >
                <div>{{ props.item.serial_number }}</div>
                <template v-slot:input>
                    <v-text-field
                        v-if="isEditableCell(props.item)"
                        class="edit-dialog"
                        v-model="props.item.serial_number"
                        single-line
                        autofocus
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
        <!-- Примечания -->
        <template v-if="editSystemCase" v-slot:item.notes="props">
            <v-edit-dialog
                :return-value.sync="props.item.notes"
                light
                transition="scale-transition"
                @open="open(props.index)"
            >
                <div>{{ props.item.notes }}</div>
                <template v-slot:input>
                    <v-text-field
                        v-if="isEditableCell(props.item)"
                        class="edit-dialog"
                        v-model="props.item.notes"
                        single-line
                        autofocus
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
    </v-data-table>
</template>

<script src="./SystemCaseTable.ts"></script>

<style lang="scss">
.v-simple-checkbox {
    width: 20px;
}

.pki-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 28px !important;
    .v-input--selection-controls__input {
        margin-left: 9px;
    }
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

tr.active {
    background: #84c6ff !important;
    transition: 0.6s background ease-out;
}

tr.not-active {
    transition: 0.6s background linear;
}
</style>
<style lang="scss" scoped>
.table-header-item {
    display: flex;
    align-items: center;
    margin-left: 10px;
}
</style>
