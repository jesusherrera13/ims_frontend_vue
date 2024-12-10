import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import axiosClient from '@/axios';
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useAuthMenuStore = defineStore({
    id: 'authMenu',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem(`${app_name}_user`)),
        token: localStorage.getItem(`${app_name}_user`),
        returnUrl: null,
        system_modules: [],
        items: [
            {
                title: 'Admin',
                icon: 'mdi-account-multiple-outline',
                children: [
                    {
                        key: 'usuarios',
                        title: 'Usuarios',
                        icon: 'mdi-cog-outline',
                        to: '/roles',
                        visible: false
                    },
                    {
                        key: 'rol',
                        title: 'Roles',
                        icon: 'mdi-cog-outline',
                        to: '/roles',
                        visible: false
                    }
                ]
            }
        ],
        error: false,
        message: ''
    }),
    actions: {
        getItems() {
            return this.items;
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
        }
    }
});
