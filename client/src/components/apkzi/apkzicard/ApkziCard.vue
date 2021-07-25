<template>
  <v-dialog
      v-model="dialog"
      max-width="600px"
      persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
          @click="newApkzi"
      >
        Добавить АПКЗИ
      </v-btn>
    </template>
    <v-form
        class="pki-card-form"
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <h4>
            АПКЗИ  для {{editedItem.part}}
        </h4>
        <h4 v-if="editedItem.number_machine">
            Системный блок №{{editedItem.number_machine}}
        </h4>
        <v-text-field
            v-model="editedItem.fdsi"
            label="ФДШИ"
            dense
            autofocus
            required
            :rules="validationRules"
        ></v-text-field>
        
      <v-text-field
          ref="typeField"
          v-model="editedItem.apkzi_name"
          class="mt-4"
          label="Наименование АПКЗИ"
          dense
          required
          :rules="validationRules"
      ></v-text-field>

      <v-text-field
          class="mt-4"
          v-model="editedItem.kont_name"
          label="Наименование контроллера СЗИ"
          dense
          required
          :rules="validationRules"
      ></v-text-field>

      <v-text-field
          class="mt-4"
          v-model="editedItem.fdsiKontr"
          :rules="validationRules"
          label="ФДШИ контроллера СЗИ"
          required
          dense
      ></v-text-field>

      <v-text-field
          v-model="editedItem.zav_number"
          class="mt-4"
          label="Заводской номер"
          dense
          required
          :rules="validationRules"
      ></v-text-field>

      <v-text-field
          class="mt-4"
          ref="serialNumberField"
          v-model="editedItem.kontr_zav_number"
          :rules="validationRules"
          label="Заводской номер контроллера"
          required
          dense
      ></v-text-field>
      
      <v-spacer></v-spacer>
      
      <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
      >
        Отмена
      </v-btn>
      <v-btn
          color="blue darken-1"
          text
          @click="save"
          :disabled="disableSaveBtn"
      >
        Сохранить
      </v-btn>

    </v-form>
  </v-dialog>
</template>

<script src="./ApkziCard.ts" lang="ts"></script>

<style lang="scss">

</style>
