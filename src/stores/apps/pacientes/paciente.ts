// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';

export const usePacienteStore = defineStore({
    id: 'Paciente',
    state: () => ({
        pacientes: [],
        paciente: {
            id: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            religion_id: '',
            f_nacimiento: '',
            domicilio: '',
            foto_perfil: ''
        },
        religiones: [],
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        async fetchPacientes() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/paciente`, { params: this.params });
                this.pacientes = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchPacientesPorReligion(religionId:any) {
            try {
            const response = await axiosClient.get(`/religion/${religionId}/pacientes`); 
            this.pacientes = response.data; 
            } catch (error) {
            console.error('Error fetching pacientes:', error);
            
            }
        },


        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/paciente`, this.paciente);
                this.paciente = response.data;
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
                const response = await axiosClient.put(`/paciente/${this.paciente.id}`, this.paciente);
                this.paciente = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/paciente/${this.paciente.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },
        async fetchReligion() {
            try {
                const response = await axiosClient.get('/religion');
                let religion: any = response.data;
                let newEstado: any = religion.map((data: any) => ({
                    ...data,
                    id: data.id,
                    title: `${data.nombre}`,
                    nombre: data.nombre                    
                }));
                this.religiones = newEstado; // Corregir la asignación
                console.log('Fetched religiones:', this.religiones);
            } catch (error) {
                console.error('Error fetching religiones:', error);
                alert('Error fetching religiones: ' + error);
            }
        },
    }
});
