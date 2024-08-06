// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';

export const usePaisStore = defineStore({
    id: 'Pais',
    state: () => ({
        paises: [],
        pais: {
            id: '',
            nombre: '',
        },
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        async fetchPaises() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/pais`, { params: this.params });
                this.paises = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/pais`, this.pais);
                this.pais = response.data;
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
                const response = await axiosClient.put(`/pais/${this.pais.id}`, this.pais);
                this.pais = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/pais/${this.pais.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});