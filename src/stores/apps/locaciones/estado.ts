import { defineStore } from 'pinia';
import axiosClient from '@/axios';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useEstadoStore = defineStore({
    id: 'Estado',
    state: () => ({
        estados: [],
        estado: {
            id: '',
            nombre: '',
            pais_id: ''
        },
        paises: [],
        params: {},
        is_loading: false,
        token: localStorage.getItem(`${app_name}_user`),
        returnUrl: null
    }),
    getters: {
        getUsers(state) {
            return state.estados;
        }
    },
    actions: {
        async fetchEstados() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/estado`, { params: this.params });
                this.estados = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchEstadosPorPais(paisId: any) {
            try {
                const response = await axiosClient.get(`/pais/${paisId}/estados`);
                this.estados = response.data;
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        },

        async saveEstado(params?: Object) {
            let url = `/registrarEstado`;
            try {
                const response = await axiosClient.post(url, params);
                this.estado = response.data.estado;
                this.token = response.data.token;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem(`${app_name}_user`, JSON.stringify(this.estado));
                localStorage.setItem(`${app_name}_token`, this.token || '');
                // redirect to previous url or default to home page
                // router.push(this.returnUrl || '/dashboards/modern');
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/estado`, this.estado);
                this.estado = response.data;
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
                const response = await axiosClient.get(`/estado/${this.estado.id}`);
                this.estado = response.data;
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
                const response = await axiosClient.put(`/estado/${this.estado.id}`, this.estado);
                this.estado = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/estado/${this.estado.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
