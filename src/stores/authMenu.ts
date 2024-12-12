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
                        icon: 'mdi-account-multiple',
                        to: '/roles',
                        visible: false
                    },
                    {
                        key: 'rol',
                        title: 'Roles',
                        icon: 'mdi-script-outline',
                        to: '/roles',
                        visible: false
                    },
                    {
                        key: 'regimen',
                        title: 'Régimen',
                        icon: 'mdi-list-box-outline',
                        to: '/regimen',
                        visible: false
                    },
                    {
                        key: 'perfiles',
                        title: 'Perfiles',
                        icon: 'mdi-account',
                        to: '/perfiles',
                        visible: false
                    },
                ]
            },
            {
                title: 'Sistemas',
                icon: 'mdi-desktop-tower-monitor',
                children: [
                    {
                        key: 'paciente',
                        title: 'Pacientes',
                        icon: 'mdi-account-injury',
                        to: '/pacientes',
                        visible: false
                    },
                    {
                        key: 'medicos',
                        title: 'Médicos',
                        icon: 'mdi-card-account-details',
                        to: '/medicos',
                        visible: false
                    },
                    {
                        key: 'recetas',
                        title: 'Recetas',
                        icon: 'mdi-invoice-list-outline',
                        to: '/recetas',
                        visible: false
                    },
                    {
                        key: 'citas',
                        title: 'Citas',
                        icon: 'mdi-calendar-range',
                        to: '/cita',
                        visible: false
                    },
                ]
            },
            {
                title: 'Configuración',
                icon: 'mdi-cog-outline',
                children: [
                    {
                        key: 'metodo-pago',
                        title: 'Metodos de pago',
                        icon: 'mdi-cash-sync',
                        to: '/metodo-pago',
                        visible: false
                    },
                    {
                        key: 'empresas',
                        title: 'Empresas',
                        icon: 'mdi-domain',
                        to: '/empresas',
                        visible: false
                    },
                    {
                        key: 'plazas',
                        title: 'Plazas',
                        icon: 'mdi-office-building',
                        to: '/plazas',
                        visible: false
                    },
                    {
                        key: 'departamentos',
                        title: 'Departamentos',
                        icon: 'mdi-office-building-outline',
                        to: '/departamentos',
                        visible: false
                    },
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
