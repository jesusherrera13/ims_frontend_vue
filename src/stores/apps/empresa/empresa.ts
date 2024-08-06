import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';
import { router } from '@/router';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useEmpresaStore = defineStore({
    id: 'Empresa',
    state: () => ({
        empresas: [],
        empresa: {
            id: '',
            employee_name: '',
            employee_last_name: '',
            employee_second_last_name: ''
        },
        params: {},
        is_loading: false
    }),
    getters: {
        getEmpresas(state) {
            return state.empresas;
        }
    },
    actions: {
        // Fetch followers from action
        async fetchEmpresas() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/empresa`, { params: this.params });
                this.empresas = response.data;
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
                const response = await axiosClient.post(`/empresa`, this.empresa);
                this.empresa = response.data;
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
                const response = await axiosClient.get(`/empresa/${this.empresa.id}`);
                this.empresa = response.data;
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
                const response = await axiosClient.put(`/empresa/${this.empresa.id}`, this.empresa);
                this.empresa = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/empresa/${this.empresa.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
