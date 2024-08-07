<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import TheSalesCard from '@/components/dashboards/ecommerce/TheSalesCard.vue';
import ProductsChart from '@/components/dashboards/ecommerce/ProductsChart.vue';
import Earnings from '@/components/dashboards/ecommerce/Earnings.vue';
import YearlySales from '@/components/dashboards/ecommerce/YearlySales.vue';
import RecentTransactions from '@/components/dashboards/ecommerce/RecentTransactions.vue';
import ProviderModule from '@/components/dashboards/provider/ProviderModule.vue';
import WeeklyStats from '@/components/dashboards/minimal/WeeklyStats.vue';
import MedicalProBranding from '@/components/dashboards/minimal/MedicalProBranding.vue';
import DailyActivities from '@/components/dashboards/ecommerce/DailyActivities.vue';
import { useProviderStore } from '@/stores/provider/provider';

const page = ref({ title: 'Ecommerce' });

const providerStore = useProviderStore();

onMounted(() => {
    providerStore.fetchProviders();
});

const getProviders = computed(() => {
    return providerStore.providers;
});

const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Ecommerce',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <!---Sales cards-->
        <v-col cols="12" lg="12">
            <TheSalesCard />
        </v-col>

        <!---Product performance-->
        <v-col v-for="item in getProviders" :key="item" cols="12" lg="6" class="d-flex align-items-stretch">
            <ProviderModule :provider="item" />
        </v-col>

        <!---Product chart-->
        <v-col cols="12" lg="8">
            <ProductsChart />
        </v-col>
        <v-col cols="12" lg="4">
            <Earnings />
            <YearlySales />
        </v-col>
        <!---Recent transaction-->
        <v-col cols="12" lg="4" class="d-flex align-items-stretch">
            <RecentTransactions />
        </v-col>

        <!---Weekly states-->
        <v-col cols="12" lg="4">
            <WeeklyStats />
        </v-col>
        <!---MedicalPro branding-->
        <v-col cols="12" lg="4">
            <MedicalProBranding />
        </v-col>
        <!---Daily activities-->
        <v-col cols="12" lg="4">
            <DailyActivities />
        </v-col>
    </v-row>
</template>
