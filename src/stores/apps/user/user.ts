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
        user_modulos: []
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
                const response = await axiosClient.post(url, params);
                this.user = response.data.user;
                this.token = response.data.token;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem(`${app_name}_user`, JSON.stringify(this.user));
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
        async update() {
            this.is_loading = true;
            try {
                const response = await axiosClient.put(`/user/${this.user.id}`, this.user);
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
            console.log(user_id);
            const response = await axiosClient.post(`/auth-user-modules`, { user_id: user_id });
            this.user_modulos = response.data.data;
        }
    }
});
