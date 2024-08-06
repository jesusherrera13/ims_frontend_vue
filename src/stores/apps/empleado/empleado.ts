import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';
import { router } from '@/router';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useEmpleadoStore = defineStore({
    id: 'Empleado',
    state: () => ({
        empleados: [],
        empleado: {
            id: '',
            employee_name: '',
            employee_last_name: '',
            employee_second_last_name: ''
        },
        params: {},
        is_loading: false
    }),
    getters: {
        getempleados(state) {
            return state.empleados;
        }
    },
    actions: {
        // Fetch followers from action
        async fetchEmpleados() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/empleado`, { params: this.params });
                this.empleados = response.data;
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
                const response = await axiosClient.post(`/empleado`, this.empleado);
                this.empleado = response.data;
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
                const response = await axiosClient.get(`/empleado/${this.empleado.id}`);
                this.empleado = response.data;
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
                const response = await axiosClient.put(`/empleado/${this.empleado.id}`, this.empleado);
                this.empleado = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/empleado/${this.empleado.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
