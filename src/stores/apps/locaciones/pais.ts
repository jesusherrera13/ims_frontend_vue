// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const usePaisStore = defineStore({
    id: 'Pais',
    state: () => ({
        paises: [],
        pais: {
            id: '',
            nombre: '',
        },
        params: {},
        is_loading: false,
        token: localStorage.getItem(`${app_name}_user`),
        returnUrl: null
    }),
    getters: {
        getPaises(state) {
            return state.paises;
        }
    },
    actions: {
        async fetchPaises() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/pais`, { params: this.params });
                this.paises = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchPais(id: string) {
            try {
                const response = await axiosClient.get(`/pais/${id}`);
                this.pais = response.data;
            } catch (error) {
                alert(error);
            }
        },
        
        async savePais(params?: Object) {
            let url = `/registrarPais`;
            try {
                const response = await axiosClient.post(url, params);
                this.pais = response.data.pais;
                this.token = response.data.token;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem(`${app_name}_user`, JSON.stringify(this.pais));
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
                const response = await axiosClient.post(`/pais`, this.pais);
                this.pais = response.data;
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
                const response = await axiosClient.get(`/user/${this.pais.id}`);
                this.pais = response.data;
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
                const response = await axiosClient.put(`/pais/${this.pais.id}`, this.pais);
                this.pais = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/pais/${this.pais.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});