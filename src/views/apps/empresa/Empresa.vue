<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UserEditableTable from '@/components/table/empresa/EmpresaEditableTable.vue';
// theme breadcrumb
const page = ref({ title: 'Lista de Empleados' });

const breadcrumbs = ref([
    {
        text: '2 Nuevos Empleados',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <UserEditableTable />
        </v-card-text>
    </v-card>
</template>
