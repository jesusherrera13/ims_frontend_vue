// stores/apps/pais.ts
import { defineStore } from 'pinia';
import axiosClient from '@/axios';

export const useCitaStore = defineStore({
    id: 'Horarios',
    state: () => ({
        horarios: [],
        horario: {
            id: '',
            start_time: '',
            end_time: '',
        },
        especialidades: [],
        medicos: [],
        params: {},
        is_loading: false
    }),
    getters: {},
    actions: {
        async fetchCitas() {
            this.is_loading = true;
            try {
                const response = await axiosClient.get(`/horario`, { params: this.params });
                this.horarios = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                this.is_loading = false;
            }
        },

        async fetchMedicoEspecialistaPorHorario(Medico:any, Horario:any, Especialidad:any) {
            try {
                const response = await axiosClient.get(`/cita/${Medico}/${Horario}/${Especialidad}`);
                this.horarios = response.data;
            } catch (error) {
                console.error('Error fetching horarios:', error);
                alert('Error fetching horarios: ' + error);
            }
        },

        // store sirve para guardar un nuevo registro
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/horario`, this.horario);
                this.horario = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },

        // update sirve para actualizar un registro
        async update() {
            this.is_loading = true;
            try {
                const response = await axiosClient.put(`/horario/${this.horario.id}`, this.horario);
                this.horario = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // delete sirve para eliminar un registro
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/cita/${this.horario.id}`);
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
                console.log('Fetched especialidad:', this.especialidades);
            } catch (error) {
                console.error('Error fetching religiones:', error);
                alert('Error fetching religiones: ' + error);
            }
        }, 
    /*     async fetchPaciente() {
            try {
                const response = await axiosClient.get('/paciente');
                let paciente: any = response.data;
                let newPaciente: any = paciente.map((data: any) => ({
                    ...data,
                    id: data.id,
                    title: `${data.nombre} ${data.apellido1}`,
                    nombre: data.nombre.concat(' ').concat(data.apellido1)                
                }));
                this.pacientes = newPaciente; // Corregir la asignación
                console.log('Fetched paciente:', this.pacientes);
            } catch (error) {
                console.error('Error fetching pacientes:', error);
                alert('Error fetching pacientes: ' + error);
            }
        },  */
         async fetchMedicosPorEspecialidad(medicoId:any) {
            try {
            const response = await axiosClient.get(`/cita/${medicoId}/especialidad`); 
            this.medicos = response.data; 
            } catch (error) {
            console.error('Error fetching medicos:', error);
            
            }
        }, 
    }
});
