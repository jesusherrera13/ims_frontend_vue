import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useModuloStore = defineStore({
    id: 'Modulo',
    state: () => ({
        modulos: [],
        modulo: {
            id: '',
            name: '',
            password: '',
            rol_id: '',
            thumb: ''
        },
        params: {},
        selected: [],
        access_user_modules: [],
        is_loading: false
    }),
    actions: {
        // Fetch followers from action
        async fetchModulos() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/modulo`, { params: this.params });
                this.modulos = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                // console.log(error);
                this.is_loading = false;
            }
        },
        async fetchAccesoModulos() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/acceso-modulos`, { params: this.params });
                this.modulos = response.data.data;
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
                const response = await axiosClient.post(`/modulo`, this.modulo);
                this.modulo = response.data;
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
                const response = await axiosClient.get(`/modulo/${this.modulo.id}`);
                this.modulo = response.data;
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
                const response = await axiosClient.put(`/modulo/${this.modulo.id}`, this.modulo);
                this.modulo = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/modulo/${this.modulo.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async storeUserModules(user_id: any, user_modules: any) {
            console.log('user_modules: ', user_modules);
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/user-modules`, { user_id: user_id, user_modules: user_modules });
                this.modulos = response.data.data;
                // console.log('this: ', this.modulos);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                // console.log(error);
                this.is_loading = false;
            }
        },
        async accessUserModules(user_id: any) {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/access-user-modules`, { user_id: user_id });
                this.access_user_modules = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                // console.log(error);
                this.is_loading = false;
            }
        }
    }
});
