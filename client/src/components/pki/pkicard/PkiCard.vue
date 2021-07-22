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
          @click="newPki"
      >
        Добавить ПКИ
      </v-btn>
    </template>
    <v-form
        class="pki-card-form"
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-text-field
            v-model="editedItem.ean_code"
            label="Штрих-код"
            filled
            dense
            autofocus
            outlined
            @keypress.enter="checkEan"
        ></v-text-field>
        
      <v-combobox
          ref="typeField"
          v-model="editedItem.type_pki"
          class="mt-4"
          label="Тип"
          dense
          required
          :hide-selected="true"
          :rules="typeRules"
          :items="autocompleteTypesPki"
          :hide-no-data="true"
          :auto-select-first="true"
          :search-input.sync="searchPki"
          :filter="filterRules"
      ></v-combobox>

      <v-combobox
          class="mt-4"
          v-model="editedItem.vendor"
          label="Производитель"
          dense
          required
          :rules="vendorRules"
          :items="autocompleteVendors"
          :hide-no-data="true"
          :auto-select-first="true"
          :filter="filterRules"
          :search-input.sync="searchVendors"
      ></v-combobox>

      <v-text-field
          class="mt-4"
          v-model="editedItem.model"
          :rules="modelRules"
          label="Модель"
          required
          dense
      ></v-text-field>

      <v-combobox
          v-model="editedItem.country"
          class="mt-4"
          label="Страна"
          dense
          required
          :items="autocompleteCountries"
          :rules="countryRules"
          :hide-no-data="true"
          :auto-select-first="true"
          :filter="filterRules"
          :search-input.sync="searchCountries"
      ></v-combobox>

      <v-text-field
          class="mt-4"
          v-model="editedItem.part"
          :rules="partRules"
          label="Тема"
          required
          dense
      ></v-text-field>

      <v-text-field
          class="mt-4"
          ref="serialNumberField"
          v-model="editedItem.serial_number"
          :rules="serialNumberRules"
          label="Серийный номер"
          required
          dense
          @keypress.enter="save"
      ></v-text-field>
        <v-text-field
            class="mt-4"
            v-if="!isNewPki"
            v-model="editedItem.number_machine"
            label="Номер системного блока"
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
      >
        Сохранить
      </v-btn>

    </v-form>
  </v-dialog>
</template>

<script src="./PkiCard.ts" lang="ts"></script>

<style lang="scss">
.pki-card-form {
  padding: 20px;
  background: white;
}
</style>
