import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';

export const useCitasEStore = defineStore({
    id: 'citasE',
    state: () => ({
        citaE: {
            id: '',
            paciente: '',
            especialidadM: '',
            doctor: '',
            fecha: '',
        },
        citasE: [],
        is_loading: false
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchCitasE() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/citasE`);
                this.citasE = response.data;
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
                const response = await axiosClient.post(`/citasE`, this.citaE);
                this.citaE = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(`/citasE/${this.citaE.id}`, this.citaE);
                this.citaE = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/citasE/${this.citaE.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
