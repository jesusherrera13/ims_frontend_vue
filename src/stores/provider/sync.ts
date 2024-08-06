import { defineStore } from 'pinia';
import { router } from '@/router';
import axiosClient from '@/axios';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useSyncStore = defineStore({
    id: 'sync',
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
        async logUnlock(service_provider_id: any) {
            this.is_loading = true;
            const response = await axiosClient.post(`/sync-log-unlock`, {
                service_provider_id: service_provider_id
            });
            // this.providers = response.data.data;
            this.is_loading = false;
        }
    }
});
