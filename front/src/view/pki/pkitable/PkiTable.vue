<template>
    <div class="wrapper">
        <fast-pki-table :columns="columns" :items="components" @change="onEdit" />
    </div>
</template>

<script setup lang="tsx">
import Pki from '@/models/Pki';
import PkiTableSetup from '@/view/pki/pkitable/PkiTableSetup';
import FastPkiTable from '@/view/pki/pkitable/FastPkiTable.vue';

const { components, loading, removeComponent, updateComponent } = PkiTableSetup();

function onEdit(row: Pki): void {
    updateComponent(row);
}

function onDelete(row: Pki): void {
    removeComponent(row);
}

const columns = [
    {
        title: 'Тип',
        dataKey: 'type_pki',
        editable: true,
    },
    {
        title: 'Производитель',
        dataKey: 'vendor',
        editable: true,
    },
    {
        title: 'Модель',
        dataKey: 'model',
        editable: true,
    },
    {
        title: 'Серийный номер',
        dataKey: 'serial_number',
        editable: false,
    },
    {
        title: 'Страна',
        dataKey: 'country',
        editable: true,
    },
    {
        title: 'Машина',
        dataKey: 'number_machine',
        editable: false,
    },
];
</script>
