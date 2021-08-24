<template>
    <v-data-table
        v-if="pc"
        :class="{ 'pki-table': $route.path !== '/assembly' }"
        dense
        v-model="selected"
        :headers="headers"
        :items="unit === 'pcUnit' ? pc.pc_unit : pc.system_case_unit"
        :hide-default-footer="true"
        :items-per-page="-1"
        item-key="i"
        :item-class="itemClass"
        :show-select="editPc"
        @click:row="onSelectRow"
    >
        <template
            v-if="!editPc && unit === 'pcUnit'"
            v-slot:top
        >
            <v-toolbar flat>
                <div style="display: flex; align-items: center">
                    <div>{{ pc.fdsi }}</div>

                    <v-divider class="mx-4" inset vertical></v-divider>
                    <div
                        :id="pc.serial_number"
                        style="padding: 10px; font-size: x-large; height: 100%"
                    >
                        № {{ pc.serial_number }}
                    </div>

                    <v-divider
                        v-if="pc.execution"
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <div v-if="pc.execution" style="padding: 10px">
                        Исполнение: {{ pc.execution }}
                    </div>

                    <v-divider
                        v-if="pc.attachment"
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <div v-if="pc.attachment" style="padding: 10px">
                        Приложение: {{ pc.attachment }}
                    </div>

                    <v-divider
                        v-if="pc.numberMachine"
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <div v-if="pc.numberMachine">
                        ПЭВМ {{ pc.numberMachine }}
                    </div>
                </div>
            </v-toolbar>
        </template>

        <!-- обозначение изделия -->
        <template v-if="editPc" v-slot:item.fdsi="props">
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
        <template v-if="editPc" v-slot:item.type="props">
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
        <template v-if="editPc" v-slot:item.name="props">
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
        <template v-if="editPc" v-slot:item.quantity="props">
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
        <template v-if="unit === 'pcUnit'" v-slot:item.serial_number="props">
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
        <template v-if="editPc" v-slot:item.notes="props">
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

<script src="./PcTable.ts" lang="ts"></script>

<style scoped></style>
