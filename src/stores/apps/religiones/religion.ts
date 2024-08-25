// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useReligionStore = defineStore({
    id: 'Religion',
    state: () => ({
        religiones: [],
        religion: {
            id: '',
            nombre: '',
        },
        params: {},
        is_loading: false,
        token: localStorage.getItem(`${app_name}_user`),
        returnUrl: null
    }),
    getters: {
        getReligiones(state) {
            return state.religiones;
        }
    },
    actions: {
        async fetchReligiones() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/religion`, { params: this.params });
                this.religiones = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchReligion(id: string) {
            try {
                const response = await axiosClient.get(`/religion/${id}`);
                this.religion = response.data;
            } catch (error) {
                alert(error);
            }
        },
        
        async saveReligion(params?: Object) {
            let url = `/registrarReligion`;
            try {
                const response = await axiosClient.post(url, params);
                this.religion = response.data.religion;
                this.token = response.data.token;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem(`${app_name}_user`, JSON.stringify(this.religion));
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
                const response = await axiosClient.post(`/religion`, this.religion);
                this.religion = response.data;
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
                const response = await axiosClient.get(`/religion/${this.religion.id}`);
                this.religion = response.data;
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
                const response = await axiosClient.put(`/religion/${this.religion.id}`, this.religion);
                this.religion = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/religion/${this.religion.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});