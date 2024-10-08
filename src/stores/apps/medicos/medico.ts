// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';

export const useMedicoStore = defineStore({
    id: 'Medico',
    state: () => ({
        medicos: [],
        medico: {
            id: '',
            nombre: '',
            rfc: '',
            direccion: '',
            cp: '',
            ciudad_id: '',
            estado_id: '',
            genero: '',
            especialidad_id: ''
        },
        especialidades: [],
        ciudades: [],
        estados: [],
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        async fetchMedicos() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/medico`, { params: this.params });
                this.medicos = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchMedicosPorEspecialidad(especialidadId:any) {
            try {
            const response = await axiosClient.get(`/especialidad/${especialidadId}/medicos`); 
            this.medicos = response.data; 
            } catch (error) {
            console.error('Error fetching medicos:', error);
            
            }
        },


        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/medico`, this.medico);
                this.medico = response.data;
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
                const response = await axiosClient.put(`/medico/${this.medico.id}`, this.medico);
                this.medico = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/medico/${this.medico.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async fetchEspecialidad() {
            try {
                const response = await axiosClient.get('/especialidad');
                let especialidad: any = response.data;
                let newEspecialidad: any = especialidad.map((data: any) => ({
                    ...data,
                    id: data.id,
                    title: `${data.nombre}`,
                    nombre: data.nombre                    
                }));
                this.especialidades = newEspecialidad; // Corregir la asignación
                console.log('Fetched especialidades:', this.especialidades);
            } catch (error) {
                console.error('Error fetching especialidades:', error);
                alert('Error fetching especialidades: ' + error);
            }
        },
        async fetchEstado() {
            try {
                const response = await axiosClient.get('/estado');
                let estado: any = response.data;
                let newEstado: any = estado.map((data: any) => ({
                    ...data,
                    id: data.id,
                    title: `${data.nombre}`,
                    nombre: data.nombre                    
                }));
                this.estados = newEstado; // Corregir la asignación
                console.log('Fetched estados:', this.estados);
            } catch (error) {
                console.error('Error fetching estados:', error);
                alert('Error fetching estados: ' + error);
            }
        },
        async fetchCiudad() {
            try {
                const response = await axiosClient.get('/ciudad');
                let ciudad: any = response.data;
                let newCiudad: any = ciudad.map((data: any) => ({
                    ...data,
                    id: data.id,
                    title: `${data.nombre}`,
                    nombre: data.nombre                    
                }));
                this.ciudades = newCiudad; // Corregir la asignación
                console.log('Fetched ciudades:', this.ciudades);
            } catch (error) {
                console.error('Error fetching ciudades:', error);
                alert('Error fetching ciudades: ' + error);
            }
        },
    }
});
