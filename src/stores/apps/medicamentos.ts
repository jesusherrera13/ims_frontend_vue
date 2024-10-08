import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';

export const useMedicamentosStore = defineStore({
    id: 'medicamentos',
    state: () => ({
        medicamento: {
            id: '',
            nombre: '',
            descripcion: '',
            cantidad: '',
            presentacion: '',
            indicaciones: '',
            dosis: '',
        },
        medicamentos: [],
        is_loading: false
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchMedicamentos() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/medicamentos`);
                this.medicamentos = response.data;
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
                const response = await axiosClient.post(`/medicamentos`, this.medicamento);
                this.medicamento = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(`/medicamentos/${this.medicamento.id}`, this.medicamento);
                this.medicamento = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/medicamentos/${this.medicamento.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
