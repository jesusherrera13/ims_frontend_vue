import { defineStore } from 'pinia';
import axiosClient from '@/axios';

export const useEstadoStore = defineStore({
    id: 'Estado',
    state: () => ({
        estados: [],
        estado: {
            id: '',
            nombre: '',
            pais_id: ''
        },
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        async fetchEstados() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/estado`, { params: this.params });
                this.estados = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/estado`, this.estado);
                this.estado = response.data;
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
                const response = await axiosClient.put(`/estado/${this.estado.id}`, this.estado);
                this.estado = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/estado/${this.estado.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
