<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableTable from '@/components/table/especialidades/EspecialidadEditableTable.vue';
// theme breadcrumb
const page = ref({ title: 'Especialidades' });

const breadcrumbs = ref([
    {
        text: '2 Nuevas Especialidades',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <EditableTable />
        </v-card-text>
    </v-card>
</template>
