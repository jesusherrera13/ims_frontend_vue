import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';
import { router } from '@/router';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useUserStore = defineStore({
    id: 'Usuario',
    state: () => ({
        users: [],
        user: {
            id: '',
            name: '',
            password: ''
        },
        params: {},
        is_loading: false,
        token: localStorage.getItem(`${app_name}_user`),
        returnUrl: null,
        user_modulos: [],
        alert: false,
        message: '',
        errors: [],
        error: false
    }),
    getters: {
        getUsers(state) {
            return state.users;
        }
    },
    actions: {
        // Fetch followers from action
        async fetchUsers() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/user`, { params: this.params });
                this.users = response.data.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                // console.log(error);
                this.is_loading = false;
            }
        },
        async saveUser(params?: Object) {
            let url = `/register`;
            try {
                const response: any = await axiosClient.post(url, params);

                return { ...response.data, status: response.status };
            } catch (error: any) {
                console.log('error: ', error);
                this.error = true;
                // this.alert = true;
                this.message = error.response.data.message || 'Error';
                // console.log('xxx: ', error);
                // this.errors = error.errors;
                // console.log('errors: ', error);
            }
        },
        async store(payload: any) {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/user`, this.user);
                this.user = response.data;
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
                const response = await axiosClient.get(`/user/${this.user.id}`);
                this.user = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async update(payload: any) {
            this.is_loading = true;
            try {
                const response = await axiosClient.put(`/user/${payload.id}`, payload);
                this.user = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/user/${this.user.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async userModules(user_id: any) {
            const response = await axiosClient.post(`/auth-user-modules`, { user_id: user_id });
            this.user_modulos = response.data.data;

            return this.user_modulos;
        },
        async passwordReset(user_id: any) {
            return await axiosClient.post(`/password-reset/${user_id}`);
        }
    }
});
