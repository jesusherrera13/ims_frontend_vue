import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';
import { router } from '@/router';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useCompaniaStore = defineStore({
    id: 'Compania',
    state: () => ({
        companias: [],
        compania: {
            id: '',
            employee_name: '',
            employee_last_name: '',
            employee_second_last_name: ''
        },
        params: {},
        is_loading: false,
        empresa: {
            id: ''
        }
    }),
    getters: {
        getCompanias(state) {
            return state.companias;
        }
    },
    actions: {
        // Fetch followers from action
        async fetchCompanias() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/compania`, { params: this.params });
                this.companias = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                // console.log(error);
                this.is_loading = false;
            }
        },
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/compania`, this.compania);
                this.compania = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async show() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/compania/${this.compania.id}`);
                this.compania = response.data;
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
                const response = await axiosClient.put(`/compania/${this.compania.id}`, this.compania);
                this.compania = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/compania/${this.compania.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
