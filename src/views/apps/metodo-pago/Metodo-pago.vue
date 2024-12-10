<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import MetodosPEditableTable from '@/components/table/sistema/MetodosPagoEditableTable.vue';
// theme breadcrumb
const page = ref({ title: 'Lista de metodos de pago' });

const breadcrumbs = ref([
    {
        text: 'Metodos de pago disponibles',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <MetodosPEditableTable />
        </v-card-text>
    </v-card>
</template>
