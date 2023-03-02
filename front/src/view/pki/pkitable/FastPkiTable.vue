<template>
    <div class="table-root">
        <table>
            <tr>
                <th class="header">№</th>
                <th class="header" v-for="column in columns" :key="column.title">
                    {{ column.title }}
                </th>
            </tr>
            <tr v-for="item in items" :key="item._id">
                <td class="index-cell" v-html="getIndex(item)"></td>
                <td
                    v-for="column in columns"
                    :key="column.dataKey"
                    :contenteditable="column.editable"
                    @keydown.enter="nextCellByEnter($event)"
                    @blur="change($event, item, column)"
                >
                    {{ item[column.dataKey] }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import Pki from '@/models/Pki';
import Navigation from '@/view/pki/pkitable/navigation/Navigation';
import _ from 'lodash';
interface Prop {
    items?: Pki[];
    columns?: { title: string; dataKey: string; editable: boolean }[];
}

const props = withDefaults(defineProps<Prop>(), {
    items: () => [],
    columns: () => [],
});

const emit = defineEmits(['change', 'delete']);

const { columns, items } = toRefs(props);
const { nextCellByEnter } = Navigation();

function getIndex(row: Pki): number | null {
    const index = items.value.indexOf(row) + 1;
    return index ? index : null;
}

function change(event: any, row: Pki, column: any): void {
    const keys = Object.keys(row) as (keyof Pki)[];
    const index = keys.indexOf(column.dataKey);
    const key = keys[index];
    const oldRow = _.cloneDeep(row);
    const value = event.target.innerHTML;
    row[key] = value as never;
    if (oldRow[key] !== value) {
        emit('change', row, oldRow);
    }
}
</script>

<style scoped>
.table-root {
    height: 100%;
    width: 100%;
}
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
.header {
    font-weight: bold;
}
td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 4px;
}

td:focus-visible {
    outline: none;
    z-index: 1;
    box-shadow: 0 0 8px 0 rgb(116 124 144 / 65%) inset;
}

tr:nth-child(even) {
    background-color: #ececec;
}
</style>
