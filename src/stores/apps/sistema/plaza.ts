import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';
import { router } from '@/router';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useAccesoPlazaStore = defineStore({
    id: 'AccesoPlaza',
    state: () => ({
        empresas_plazas: [],
        plaza: {
            id: '',
            employee_name: '',
            employee_last_name: '',
            employee_second_last_name: ''
        },
        params: {},
        is_loading: false
    }),
    actions: {
        async fetchAccesoPlazas() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/acceso-plazas`, { params: this.params });
                this.empresas_plazas = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async storeUserPlazas(user_id: any, user_plazas: any) {
            console.log('user_plazas: ', user_plazas);
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/access-plazas-store`, { user_id: user_id, user_plazas: user_plazas });
                this.empresas_plazas = response.data.data;
                // console.log('this: ', this.modulos);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                // console.log(error);
                this.is_loading = false;
            }
        }
    }
});
