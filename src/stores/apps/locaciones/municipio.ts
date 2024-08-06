// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';
const app_name = `${import.meta.env.VITE_APP_NAME}`;

export const useMunicipioStore = defineStore({
    id: 'Municipio',
    state: () => ({
        municipios: [],
        municipio: {
            id: '',
            nombre: '',
            estado_id: ''
        },
        estados: [],
        params: {},
        is_loading: false,
        token: localStorage.getItem(`${app_name}_user`),
        returnUrl: null
    }),
    getters: {
        getMunicipios(state) {
            return state.municipios;
        }
    },
    actions: {
        async fetchMunicipios() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/municipio`, { params: this.params });
                this.municipios = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchMunicipiosPorEstado(estadoId:any) {
            try {
            const response = await axiosClient.get(`/estado/${estadoId}/municipios`); 
            this.municipios = response.data; 
            } catch (error) {
            console.error('Error fetching municipios:', error);
            }
        },                   
            
        async saveMunicipio(params?: Object) {
            let url = `/registrarMunicipio`;
            try {
                const response = await axiosClient.post(url, params);
                this.municipio = response.data.municipio;
                this.token = response.data.token;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem(`${app_name}_user`, JSON.stringify(this.municipio));
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
                const response = await axiosClient.post(`/municipio`, this.municipio);
                this.municipio = response.data;
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
                const response = await axiosClient.get(`/municipio/${this.municipio.id}`);
                this.municipio = response.data;
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
                const response = await axiosClient.put(`/municipio/${this.municipio.id}`, this.municipio);
                this.municipio = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/municipio/${this.municipio.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        }
    }
});
