// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';

export const useCiudadStore = defineStore({
    id: 'Ciudad',
    state: () => ({
        ciudades: [],
        ciudad: {
            id: '',
            nombre: '',
            municipio_id: ''
        },
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        async fetchCiudades() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/ciudad`, { params: this.params });
                this.ciudades = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/ciudad`, this.ciudad);
                this.ciudad = response.data;
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
                const response = await axiosClient.put(`/ciudad/${this.ciudad.id}`, this.ciudad);
                this.ciudad = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/ciudad/${this.ciudad.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
