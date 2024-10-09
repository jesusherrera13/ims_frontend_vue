<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import MedicamentosEditableTable from '@/components/table/sistema/MedicamentosEditableTable.vue';
// theme breadcrumb
const page = ref({ title: 'Lista de Medicamentos' });

const breadcrumbs = ref([
    {
        text: 'Medicamentos agregados',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <MedicamentosEditableTable />
        </v-card-text>
    </v-card>
</template>
