import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';

export const useMetodoPStore = defineStore({
    id: 'metodoPagos',
    state: () => ({
        metodoPago: {
            id: '',
            nombre: '',
        },
        MetodoPagos: [],
        is_loading: false
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchMetodoPagos() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/metodoPagos`);
                this.MetodoPagos = response.data;
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
                const response = await axiosClient.post(`/metodoPagos`, this.metodoPago);
                this.metodoPago = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(`/metodoPagos/${this.metodoPago.id}`, this.metodoPago);
                this.metodoPago = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/metodoPagos/${this.metodoPago.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
