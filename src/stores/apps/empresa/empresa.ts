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
            razon_social: '',
            nombre_comercial: '',
            rfc: ''
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
                const response = await axiosClient.get(`/empresas`, { params: this.params });
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
                const response = await axiosClient.post(`/empresas`, this.empresa);
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
                const response = await axiosClient.get(`/empresas/${this.empresa.id}`);
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
                const response = await axiosClient.put(`/empresas/${this.empresa.id}`, this.empresa);
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
                const response = await axiosClient.delete(`/empresas/${this.empresa.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
