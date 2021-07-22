<template>
    <div style="height: calc(100vh - 90px)">
        <v-data-table
            dense
            fixed-header
            class="pki-table"
            height="calc(100vh - 214px)"
            :search="search"
            :headers="headers"
            :items="displayedPki"
            :items-per-page="100"
            :loading="loading"
            :calculate-widths="true"
            :footer-props="{
                'items-per-page-options': [25, 50, 100, 200, -1],
            }"
            loading-text="Загрузка данных..."
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-text-field
                        class="search-input"
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Поиск"
                        clearable
                        hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-select
                        v-model="selectedType"
                        class="type-select mt-5"
                        :items="types"
                        label="Тип"
                        :menu-props="{ offsetY: true }"
                    ></v-select>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <pki-card
                        ref="pkiCard"
                        :editedItem="editedItem"
                        :isNewPki="isNewPki"
                        @createNewPki="createNewPki"
                        @editComplete="editComplete"
                        @addNewPki="addNewPki"
                        @notUniqueSerialNumber="notUniqueSerialNumber"
                    ></pki-card>
                    <settings-menu @isEditing="changeEditing"></settings-menu>
                    <v-dialog
                        v-model="dialogDelete"
                        :isNewPki="isNewPki"
                        max-width="290"
                        persistent
                    >
                        <v-card>
                            <v-card-title class="text-h6"
                                >Удалить ПКИ?</v-card-title
                            >
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialogDelete = false"
                                    >Отмена</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="deleteItemConfirm"
                                    >OK</v-btn
                                >
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:item.type_pki="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.type_pki"
                    @save="onEditPKI(props.item)"
                >
                    {{ props.item.type_pki }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.type_pki"
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.vendor="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.vendor"
                    @save="onEditPKI(props.item)"
                >
                    {{ props.item.vendor }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.vendor"
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.model="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.model"
                    @save="onEditPKI(props.item)"
                >
                    {{ props.item.model }}
                    <template v-slot:input>
                        <v-text-field v-model="props.item.model"></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.serial_number="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.serial_number"
                    @save="onEditPKI(props.item)"
                >
                    {{ props.item.serial_number }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.serial_number"
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.country="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.country"
                    @save="onEditPKI(props.item)"
                >
                    {{ props.item.country }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.country"
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <el-popconfirm
                    title="Удалить ПКИ?"
                    @confirm="deleteItemConfirm(item)"
                >
                    <v-icon small slot="reference"> mdi-delete </v-icon>
                </el-popconfirm>
            </template>
        </v-data-table>
    </div>
</template>

<script src="./PkiTable.ts" lang="ts"></script>

<style lang="scss">
.pki-table {
    td {
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        border-left: thin solid rgba(0, 0, 0, 0.12);
        font-size: 13px !important;
        padding: 0 5px !important;
    }
    .type-select {
        max-width: 500px;
    }
    .search-input {
        max-width: 500px;
    }
}
</style>
