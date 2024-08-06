import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import axiosClient from '@/axios';
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem(`${app_name}_user`)),
        token: localStorage.getItem(`${app_name}_user`),
        returnUrl: null,
        system_modules: [],
        auth_sidebar: []
    }),
    actions: {
        async login(email: string, password: string) {
            const response = await axiosClient.post(`/login`, { email: email, password: password });

            // update pinia state
            this.user = response.data.user;
            this.token = response.data.token;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem(`${app_name}_user`, JSON.stringify(this.user));
            localStorage.setItem(`${app_name}_token`, this.token || '');
            // redirect to previous url or default to home page
            // router.push(this.returnUrl || '/dashboards/modern');
            router.push(this.returnUrl || '/');
        },
        async logout() {
            await axiosClient.post(`/logout`).then((res) => {
                this.user = { id: '', name: '' };
                localStorage.removeItem(`${app_name}_user`);
                localStorage.removeItem(`${app_name}_token`);
                router.push('/auth/login');
            });
        },
        async userModules(user_id: any) {
            const response = await axiosClient.post(`/auth-user-modules`, { user_id: user_id });
            this.system_modules = response.data.data;
        },
        async authSideBar(user_id: any) {
            const response = await axiosClient.post(`/auth-sidebar`, { user_id: user_id });
            this.auth_sidebar = response.data;
        }
    }
});
