// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';

export const useMunicipioStore = defineStore({
    id: 'Municipio',
    state: () => ({
        municipios: [],
        municipio: {
            id: '',
            nombre: '',
            estado_id: ''
        },
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        async fetchMunicipios() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/municipio`, { params: this.params });
                this.municipios = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/municipio`, this.municipio);
                this.municipio = response.data;
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
                const response = await axiosClient.put(`/municipio/${this.municipio.id}`, this.municipio);
                this.municipio = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/municipio/${this.municipio.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
