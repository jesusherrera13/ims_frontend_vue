import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';

export const useRolStore = defineStore({
    id: 'Rol',
    state: () => ({
        roles: [],
        rol: {
            id: '',
            nombre: ''
        },
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchRoles() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/rol`, { params: this.params });
                this.roles = response.data;
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
                const response = await axiosClient.post(`/rol`, this.rol);
                this.rol = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(`/rol/${this.rol.id}`, this.rol);
                this.rol = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/rol/${this.rol.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
