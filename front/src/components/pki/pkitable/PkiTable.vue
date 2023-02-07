<template>
  <div style="height: 100%">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          v-if="components.length"
          fixed
          :columns="columns"
          :data="components"
          :width="width"
          :height="height"
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script lang="tsx">
import { defineComponent } from "vue";
import type Pki from "@/models/Pki";
import type { Column } from "element-plus";
import PkiApi from "@/api/PkiApi";

export default defineComponent({
  name: "pkiTable",
  data() {
    return { components: [] as Pki[], tableItems: [] };
  },

  async mounted() {
    await this.getComponents();
  },
  methods: {
    async getComponents(): Promise<void> {
      const part = this.part;
      const data = await PkiApi.getPki(part);
      this.components = data.sort((a: Pki, b: Pki): number => {
        if (a.type_pki > b.type_pki) {
          return 1;
        }
        return a.type_pki < b.type_pki ? -1 : 0;
      });
    },
  },
  computed: {
    columns(): Column[] {
      return columns;
    },
    part(): string {
      return this.$store.getters.getPart;
    },
  },
});

export const columns = [
  {
    title: "№",
    width: 60,
    maxWidth: 30,
  },
  {
    title: "Тип",
    width: 100,
    dataKey: "type_pki",
    sortable: true,
  },
  {
    title: "Производитель",
    width: 120,
    dataKey: "vendor",
    sortable: true,
  },
  {
    title: "Модель",
    width: 200,
    dataKey: "model",
    sortable: true,
  },
  {
    title: "Серийный номер",
    width: 250,
    dataKey: "serial_number",
  },
];
</script>
