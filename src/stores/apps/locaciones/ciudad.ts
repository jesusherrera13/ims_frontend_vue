// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';

export const useCiudadStore = defineStore({
    id: 'Ciudad',
    state: () => ({
        ciudades: [],
        ciudad: {
            id: '',
            nombre: '',
            municipio_id: ''
        },
        municipios: [],
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        async fetchCiudades() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/ciudad`, { params: this.params });
                this.ciudades = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchCiudadesPorEstado(municipioId:any) {
            try {
            const response = await axiosClient.get(`/municipio/${municipioId}/ciudades`); 
            this.ciudades = response.data; 
            } catch (error) {
            console.error('Error fetching ciudades:', error);
            
            }
        },


        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/ciudad`, this.ciudad);
                this.ciudad = response.data;
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
                const response = await axiosClient.put(`/ciudad/${this.ciudad.id}`, this.ciudad);
                this.ciudad = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/ciudad/${this.ciudad.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async fetchMunicipio() {
            try {
                const response = await axiosClient.get('/municipio');
                let municipio: any = response.data;
                let newEstado: any = municipio.map((data: any) => ({
                    ...data,
                    id: data.id,
                    title: `${data.nombre}`,
                    nombre: data.nombre                    
                }));
                this.municipios = newEstado; // Corregir la asignación
                console.log('Fetched municipios:', this.municipios);
            } catch (error) {
                console.error('Error fetching municipios:', error);
                alert('Error fetching municipios: ' + error);
            }
        },
    }
});
