import { defineStore } from 'pinia';
import { router } from '@/router';
import axiosClient from '@/axios';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useProviderStore = defineStore({
    id: 'provider',
    state: () => ({
        providers: [],
        is_loading: false
    }),
    actions: {
        async fetchProviders() {
            this.is_loading = true;
            const response = await axiosClient.post(`/cloud-provider`);
            this.providers = response.data.data;
            this.is_loading = false;
        },
        async syncModule(service_provider_id: any, module: any) {
            this.is_loading = true;
            const response = await axiosClient.post(`/cloud-provider-sync`, {
                service_provider_id: service_provider_id,
                module: module
            });
            // this.providers = response.data.data;
            this.is_loading = false;
        }
    }
});
