// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useEspecialidadStore = defineStore({
    id: 'Especialidad',
    state: () => ({
        especialidades: [],
        especialidad: {
            id: '',
            nombre: '',
        },
        params: {},
        is_loading: false,
        token: localStorage.getItem(`${app_name}_user`),
        returnUrl: null
    }),
    getters: {
        getEspecialidades(state) {
            return state.especialidades;
        }
    },
    actions: {
        async fetchEspecialidades() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/especialidad`, { params: this.params });
                this.especialidades = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchEspecialidad(id: string) {
            try {
                const response = await axiosClient.get(`/especialidad/${id}`);
                this.especialidad = response.data;
            } catch (error) {
                alert(error);
            }
        },
        
        async saveEspecialidad(params?: Object) {
            let url = `/registrarEspecialidad`;
            try {
                const response = await axiosClient.post(url, params);
                this.especialidad = response.data.especialidad;
                this.token = response.data.token;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem(`${app_name}_user`, JSON.stringify(this.especialidad));
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
                const response = await axiosClient.post(`/especialidad`, this.especialidad);
                this.especialidad = response.data;
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
                const response = await axiosClient.get(`/especialidad/${this.especialidad.id}`);
                this.especialidad = response.data;
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
                const response = await axiosClient.put(`/especialidad/${this.especialidad.id}`, this.especialidad);
                this.especialidad = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/especialidad/${this.especialidad.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});