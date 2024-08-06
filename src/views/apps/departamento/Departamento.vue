<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import DepartamentoEditableTable from '@/components/table/empresa/DepartamentoEditableTable.vue';
// theme breadcrumb
const page = ref({ title: 'Lista de Departamentos' });

const breadcrumbs = ref([
    {
        text: '2 Nuevos Departamentos',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <DepartamentoEditableTable />
        </v-card-text>
    </v-card>
</template>
