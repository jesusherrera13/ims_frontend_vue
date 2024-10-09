import { defineStore } from 'pinia';
// project imports

import axiosClient from '@/axios';
import { router } from '@/router';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useAccesoStore = defineStore({
    id: 'Acceso',
    state: () => ({
        user: {
            id: '',
            name: '',
            password: ''
        }
    }),
    actions: {}
});
