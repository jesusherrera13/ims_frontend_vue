import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';
import { router } from '@/router';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useDepartamentoStore = defineStore({
    id: 'Departamento',
    state: () => ({
        departamentos: [],
        departamento: {
            id: '',
            department_name: '',
            company_id: ''
        },
        params: {},
        is_loading: false
    }),
    getters: {
        getDepartamentos(state) {
            return state.departamentos;
        }
    },
    actions: {
        // Fetch followers from action
        async fetchDepartamentos() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/departamento`, { params: this.params });
                this.departamentos = response.data;
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
                const response = await axiosClient.post(`/departamento`, this.departamento);
                this.departamento = response.data;
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
                const response = await axiosClient.get(`/departamento/${this.departamento.id}`);
                this.departamento = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update() {
            this.is_loading = true;
            console.log(this.departamento.id);
            try {
                const response = await axiosClient.put(`/departamento/${this.departamento.id}`, this.departamento);
                this.departamento = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/departamento/${this.departamento.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
