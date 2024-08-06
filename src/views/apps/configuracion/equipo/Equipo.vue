<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EquipoEditableTable from '@/components/table/configuracion/EquipoEditableTable.vue';
// theme breadcrumb
const page = ref({ title: 'Lista de Equipos' });

const breadcrumbs = ref([
    {
        text: '2 Nuevos Equipos',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <EquipoEditableTable />
        </v-card-text>
    </v-card>
</template>
