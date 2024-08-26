import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';

export const usePerfilesStore = defineStore({
    id: 'perfiles',
    state: () => ({
        perfil: {
            id: '',
            nombre: '',
        },
        perfiles: [],
        is_loading: false
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchPerfiles() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/perfiles`);
                this.perfiles = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/perfiles`, this.perfil);
                this.perfil = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(`/perfiles/${this.perfil.id}`, this.perfil);
                this.perfil = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/perfiles/${this.perfil.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
