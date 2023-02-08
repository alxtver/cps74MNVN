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
          :row-height="30"
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup lang="tsx">
import PkiTableSetup from "@/components/pki/pkitable/PkiTableSetup";
import Pki from "@/models/Pki";
import { ElButton, ElPopconfirm } from "element-plus";

const { components, removeComponent } = PkiTableSetup();


const onEdit = (row: Pki): void => {
  debugger;
};

const onDelete = (row: Pki): void => {
  removeComponent(row)
};

const columns = [
  {
    title: "№",
    width: 30,
    maxWidth: 30,
    cellRenderer: ({ rowIndex: index }: { rowIndex: number }) => (
      <>
        <div>{index + 1}</div>
      </>
    ),
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
  {
    title: "Страна",
    width: 270,
    dataKey: "country",
  },
  {
    title: "",
    width: 270,
    cellRenderer: ({ rowData: row }: { rowData: Pki }) => (
      <>
        <ElButton
          size="small"
          type="primary"
          icon="Edit"
          onClick={() => onEdit(row)}
        ></ElButton>

        <ElPopconfirm title="Удалить?" onConfirm={() => onDelete(row)}>
          {{
            reference: () => (
              <ElButton
                size="small"
                type="danger"
                icon="Delete"
              />
            ),
          }}
        </ElPopconfirm>
      </>
    ),
  },
];
</script>
