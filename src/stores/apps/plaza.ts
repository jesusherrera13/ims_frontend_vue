import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';

export const usePlazaStore = defineStore({
    id: 'plaza',
    state: () => ({
        plazas: [],
        plaza: {
            id: '',
            nombre: '',
            created_by: '',
            empresa_id: ''
        },
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchPlazas() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/plazas`, { params: this.params });
                this.plazas = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/plazas`, this.plaza);
                this.plaza = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update() {
            this.is_loading = true;
            try {
                const response = await axiosClient.put(`/plazas/${this.plaza.id}`, this.plaza);
                this.plaza = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/plazas/${this.plaza.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});

/*         async savePlaza(params?: { id?: string }) {
            let url = `/plazas`;
            if (params?.id) url += `/${params.id}`;
            try {
                const response = await axiosClient.post(url, params);
                this.plaza = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async deletePlaza(params?: { id: string }) {
            try {
                await axiosClient.delete(`/plazas/${params?.id}`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
}); */
