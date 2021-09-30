<template>
    <v-data-table
        dense
        fixed-header
        :items="eanCodes"
        :headers="headers"
        :search="search"
        :items-per-page="50"
        :calculate-widths="true"
        :footer-props="{
            'items-per-page-options': [25, 50, 100, 200, -1],
        }"
        @click:row="onSelectRow"
    >
        <template v-slot:top>
          <div style="width: 500px;">
            <v-text-field
              v-model="search"
              label="Поиск"
              class="mx-4"
            ></v-text-field>
          </div>
          
        </template>

        <template v-slot:item.ean_code="props">
            <v-edit-dialog
                :return-value.sync="props.item.ean_code"
                @save="onEditEan(props.item)"
            >
                {{ props.item.ean_code }}
                <template v-slot:input>
                    <v-text-field v-model="props.item.ean_code"></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
  
      <template v-slot:item.type_pki="props">
        <v-edit-dialog
          :return-value.sync="props.item.type_pki"
          @save="onEditEan(props.item)"
        >
          {{ props.item.type_pki }}
          <template v-slot:input>
            <v-text-field v-model="props.item.type_pki"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
  
      <template v-slot:item.vendor="props">
        <v-edit-dialog
          :return-value.sync="props.item.vendor"
          @save="onEditEan(props.item)"
        >
          {{ props.item.vendor }}
          <template v-slot:input>
            <v-text-field v-model="props.item.vendor"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
  
      <template v-slot:item.model="props">
        <v-edit-dialog
          :return-value.sync="props.item.model"
          @save="onEditEan(props.item)"
        >
          {{ props.item.model }}
          <template v-slot:input>
            <v-text-field v-model="props.item.model"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
  
      <template v-slot:item.country="props">
        <v-edit-dialog
          :return-value.sync="props.item.country"
          @save="onEditEan(props.item)"
        >
          {{ props.item.country }}
          <template v-slot:input>
            <v-text-field v-model="props.item.country"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

        <template v-slot:item.actions="{ item }">
            <el-popconfirm title="Удалить?" @confirm="deleteItemConfirm(item)">
                <v-icon small slot="reference"> mdi-delete </v-icon>
            </el-popconfirm>
        </template>
    </v-data-table>
</template>

<script src="./EansTable.ts" lang="ts"></script>

<style scoped></style>
