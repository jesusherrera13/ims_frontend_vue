<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import CitasEEditableTable from '@/components/table/sistema/CitasEfectivasEditableTable.vue';
// theme breadcrumb
const page = ref({ title: 'Lista de citas' });

const breadcrumbs = ref([
    {
        text: 'Citas programadas',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <CitasEEditableTable />
        </v-card-text>
    </v-card>
</template>
