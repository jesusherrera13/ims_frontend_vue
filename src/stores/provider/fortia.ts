import { defineStore } from 'pinia';
import { router } from '@/router';
import axiosClient from '@/axios';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useFortiaStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem(`${app_name}_user`)),
        token: localStorage.getItem(`${app_name}_user`),
        returnUrl: null,
        system_modules: [],
        auth_sidebar: [],
        is_loading: false
    }),
    actions: {
        async cloudSync() {
            this.is_loading = true;
            const response = await axiosClient.post(`/fortia-sync`);
            this.is_loading = false;
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
