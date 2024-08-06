import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';

export const useRegimenStore = defineStore({
    id: 'regimen',
    state: () => ({
        regimen: {
            id: '',
            nombre: '',
            clave: ''
        },
        regimenes: [],
        is_loading: false
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchRegimen() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/regimen`);
                this.regimenes = response.data;
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
                const response = await axiosClient.post(`/regimen`, this.regimen);
                this.regimen = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update() {
            try {
                const response = await axiosClient.put(`/regimen/${this.regimen.id}`, this.regimen);
                this.regimen = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/regimen/${this.regimen.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
