<template>
    <div>
        <v-data-table
            dense
            fixed-header
            class="pki-table"
            :search="search"
            :headers="headers"
            :items="apkzis"
            :items-per-page="100"
            :loading="loading"
            :calculate-widths="true"
            :footer-props="{
                'items-per-page-options': [25, 50, 100, 200, -1],
            }"
            loading-text="Загрузка данных..."
            :item-class="itemClass"
            @click:row="onSelectRow"
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
                    <v-spacer></v-spacer>

                    <apkzi-card
                        ref="apkziCard"
                        :editedItem="editedItem"
                        :isNewApkzi="isNewApkzi"
                        @createNewApkzi="createNewApkzi"
                        @editComplete="editComplete"
                        @addNewApkzi="addNewApkzi"
                        @notUniqueSerialNumber="notUniqueSerialNumber"
                    ></apkzi-card>
                    <settings-menu @isEditing="changeEditing"></settings-menu>
                    <v-dialog
                        v-model="dialogDelete"
                        :isNewPki="isNewApkzi"
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

            <template v-slot:item.fdsi="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.fdsi"
                    @save="onEditApkzi(props.item)"
                >
                    {{ props.item.fdsi }}
                    <template v-slot:input>
                        <v-text-field v-model="props.item.fdsi"></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.apkzi_name="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.apkzi_name"
                    @save="onEditApkzi(props.item)"
                >
                    {{ props.item.apkzi_name }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.apkzi_name"
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.kont_name="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.kont_name"
                    @save="onEditApkzi(props.item)"
                >
                    {{ props.item.kont_name }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.kont_name"
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.fdsiKontr="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.fdsiKontr"
                    @save="onEditApkzi(props.item)"
                >
                    {{ props.item.fdsiKontr }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.fdsiKontr"
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.zav_number="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.zav_number"
                    @save="onEditApkzi(props.item)"
                >
                    {{ props.item.zav_number }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.zav_number"
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.kontr_zav_number="props" v-if="isEditing">
                <v-edit-dialog
                    :return-value.sync="props.item.kontr_zav_number"
                    @save="onEditApkzi(props.item)"
                >
                    {{ props.item.kontr_zav_number }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.kontr_zav_number"
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <el-popconfirm
                    title="Удалить АПКЗИ?"
                    @confirm="deleteItemConfirm(item)"
                >
                    <v-icon small slot="reference"> mdi-delete </v-icon>
                </el-popconfirm>
            </template>
        </v-data-table>
        <v-overlay :value="overlay" :opacity="0.8">
            <v-progress-circular
                indeterminate
                :size="70"
                :width="7"
                color="deep-orange lighten-2"
            ></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script src="./ApkziTable.ts" lang="ts"></script>

<style scoped></style>
