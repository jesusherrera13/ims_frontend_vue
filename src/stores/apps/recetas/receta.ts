// stores/apps/receta.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';

export const useRecetaStore = defineStore({
    id: 'Receta',
    state: () => ({
        recetas: [], // Lista de recetas
        receta: {
            id_receta: '',
            paciente_id: '',
            especialidad_id: '',
            descrip: '',
            fecha: '',
            sta: ''
        },
        pacientes: [], // Lista de pacientes
        especialidades: [], // Lista de especialidades
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        async fetchRecetas() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/receta`, { params: this.params });
                this.recetas = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchRecetasPorPaciente(pacienteId: any) {
            try {
                const response = await axiosClient.get(`/paciente/${pacienteId}/recetas`);
                this.recetas = response.data;
            } catch (error) {
                console.error('Error fetching recetas:', error);
            }
        },

        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/receta`, this.receta);
                this.receta = response.data;
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
                const response = await axiosClient.put(`/receta/${this.receta.id_receta}`, this.receta);
                this.receta = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        async delete() {
            this.is_loading = true;
            try {
                await axiosClient.delete(`/receta/${this.receta.id_receta}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },

        async fetchPacientes() {
            try {
                const response = await axiosClient.get('/paciente');
                this.pacientes = response.data.map((paciente: any) => ({
                    ...paciente,
                    id: paciente.id,
                    nombre: paciente.nombre
                }));
            } catch (error) {
                console.error('Error fetching pacientes:', error);
                alert('Error fetching pacientes: ' + error);
            }
        },

        async fetchEspecialidades() {
            try {
                const response = await axiosClient.get('/especialidad');
                this.especialidades = response.data.map((especialidad: any) => ({
                    ...especialidad,
                    id: especialidad.id,
                    nombre: especialidad.nombre
                }));
            } catch (error) {
                console.error('Error fetching especialidades:', error);
                alert('Error fetching especialidades: ' + error);
            }
        }
    }
});
