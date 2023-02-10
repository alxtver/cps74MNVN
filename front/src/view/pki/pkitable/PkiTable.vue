<template>
    <div style="height: 100%">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-table-v2
                    v-if="components.length"
                    fixed
                    :cache="10"
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
import PkiTableSetup from "@/view/pki/pkitable/PkiTableSetup";
import Pki from "@/models/Pki";
import { ElButton, ElPopconfirm } from "element-plus";
import { EditableCell } from "@/components/table/inputcell/EditableCell";

const { components, removeComponent, updateComponent } = PkiTableSetup();

const onEdit = (row: Pki): void => {
    updateComponent(row);
};

const onEnter = (row: Pki, evt: KeyboardEvent): void => {
    if (!evt.target || !(evt.target instanceof HTMLElement)) {
        return;
    }
    const cell = evt.target.closest(".el-table-v2__row-cell");
    if (!cell) {
        return;
    }

    const tableRow = cell.parentNode as HTMLElement;
    const cellIndex = Array.prototype.slice.call(tableRow.children).indexOf(cell);
    const nextTableRow = tableRow.nextElementSibling;
    if (!nextTableRow) {
        return;
    }
    const targetCell = Array.prototype.slice.call(nextTableRow.children)[cellIndex];
    const el = targetCell.querySelector(".table-trigger");
    if (!el) {
        return;
    }
    const clickEvent = new Event("dblclick");
    el.dispatchEvent(clickEvent);
};

const onTab = (row: Pki): void => {
    debugger;
};

const onDelete = (row: Pki): void => {
    removeComponent(row);
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
        class: "number",
    },
    {
        title: "Тип",
        width: 100,
        dataKey: "type_pki",
        cellRenderer: EditableCell(onEdit, onEnter, onTab),
        class: "typeColumn",
    },
    {
        title: "Производитель",
        width: 120,
        dataKey: "vendor",
        cellRenderer: EditableCell(onEdit, onEnter, onTab),
        class: "vendorColumn",
    },
    {
        title: "Модель",
        width: 200,
        dataKey: "model",
        cellRenderer: EditableCell(onEdit, onEnter, onTab),
        class: "modelColumn",
    },
    {
        title: "Серийный номер",
        width: 250,
        dataKey: "serial_number",
        cellRenderer: EditableCell(onEdit, onEnter, onTab),
        class: "serialNumberColumn",
    },
    {
        title: "Страна",
        width: 270,
        dataKey: "country",
        cellRenderer: EditableCell(onEdit, onEnter, onTab),
        class: "countryColumn",
    },
    {
        title: "",
        width: 270,
        class: "actionColumn",
        cellRenderer: ({ rowData: row }: { rowData: Pki }) => (
            <>
                <ElButton size="small" type="primary" icon="Edit" onClick={() => onEdit(row)} />

                <ElPopconfirm title="Удалить?" onConfirm={() => onDelete(row)}>
                    {{
                        reference: () => <ElButton size="small" type="danger" icon="Delete" />,
                    }}
                </ElPopconfirm>
            </>
        ),
    },
];
</script>

<style>
.table-v2-inline-editing-trigger {
    width: 100%;
    height: 100%;
}
</style>
