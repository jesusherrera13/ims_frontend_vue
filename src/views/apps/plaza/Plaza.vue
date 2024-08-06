<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import PlazaEditableTable from '@/components/table/empresa/PlazaEditableTable.vue';
// theme breadcrumb
const page = ref({ title: 'Plazas' });

const breadcrumbs = ref([
    {
        text: 'Lista de Plazas',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <PlazaEditableTable />
        </v-card-text>
    </v-card>
</template>
