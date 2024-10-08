<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import PerfilesEditableTable from '@/components/table/sistema/PerfilesEditableTable.vue';
// theme breadcrumb
const page = ref({ title: 'Lista de Perfiles' });

const breadcrumbs = ref([
    {
        text: 'Perfiles creados',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <PerfilesEditableTable />
        </v-card-text>
    </v-card>
</template>
