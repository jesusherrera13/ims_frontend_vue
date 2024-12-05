import { defineStore } from 'pinia';
import axiosClient from '@/axios';
import { is } from 'date-fns/locale';

export const useCompanyStore = defineStore({
    id: 'Empresa',
    state: () => ({
        companies: [],
       /*  company: {}, */
       company: {
        id: '',
        razon_social: '',
        nombre_comercial: '',
        calle: '',
        numero_exterior: '',
        numero_interior: '',
        registro_patronal: '',
       },
       paises: [],
       estados: [],
       municipios: [],
       ciudades: [],
      params: {},
        is_loading: false
       
    }),
    getters: {},
    actions: {
        async fetchCompany() {
            try {
                const response = await axiosClient.get('/empresas', { params:this.params });
                this.companies = response.data;
                console.log('Fetched companies:', this.companies);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
         async saveCompany(params: any) {
            let url = '/empresas';
            if (params.id) url += `/${params.id}`;
            try {
                const response = await axiosClient.post(url, params);
                this.company = response.data;
                console.log('Saved company:', this.company);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }, 
        /* 
        async deleteCompany(params?: any) {
            try {
                await axiosClient.delete(`/empresas/${params.id}`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }, */
        async store() {
            this.is_loading = true;
            try {
                const response = await axiosClient.post(`/empresas`, this.company);
                this.company = response.data;
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
                const response = await axiosClient.put(`/empresas/${this.company.id}`, this.company);
                this.company = response.data;
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async delete() {
            this.is_loading = true;
            try {
                const response = await axiosClient.delete(`/empresas/${this.company.id}`);
                this.is_loading = false;
            } catch (error) {
                alert(error);
                console.log(error);
                this.is_loading = false;
            }
        },

  

         async fetchPais() {
            try {
                const response = await axiosClient.get('/pais');
                let pais: any = response.data;
                let newPais: any = pais.map((data: any) => ({
                    ...data,
                    id: data.id,
                    title: `${data.nombre}`,
                    nombre: data.nombre                    
                }));
                this.paises = newPais; // Corregir la asignación
                console.log('Fetched paises:', this.paises);
            } catch (error) {
                console.error('Error fetching paises:', error);
                alert('Error fetching paises: ' + error);
            }
        },

        async savePais(params?: { id?: string }) {
            let url = `/pais`;
            if (params?.id) url += `/${params.id}`;
            try {
                await axiosClient.post(url, params);
                //this.paises = response.data;
            } catch (error) {
                alert(error);
                throw error;  // Añadir para que el error sea capturado en la llamada a save()
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
        async saveEstado(params?: { id?: string }) {
            let url = `/estado`;
            if (params?.id) url += `/${params.id}`;
            try {
                await axiosClient.post(url, params);
                //this.paises = response.data;
            } catch (error) {
                alert(error);
                throw error;  // Añadir para que el error sea capturado en la llamada a save()
            }
        },
        async fetchMunicipio() {
            try {
                const response = await axiosClient.get('/municipio');
                let municipio: any = response.data;
                let newMunicipio: any = municipio.map((data: any) => ({
                    ...data,
                    id: data.id,
                    title: `${data.nombre}`,
                    nombre: data.nombre   
                }));
                this.municipios = newMunicipio; // Corregir la asignación
                console.log('Fetched municipios:', this.municipios);
            } catch (error) {
                console.error('Error fetching municipios:', error);
                alert('Error fetching municipios: ' + error);
            }
        },
        async saveMunicipio(params: { id?: string }) {
            let url = `/municipio`;
            if (params?.id) url += `/${params.id}`;
            try {
                await axiosClient.post(url,params); //this.paises = response.data;
            } catch (error) {
                alert(error);
                throw error;  // Añadir para que el error sea capturado en la llamada a save()
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
                console.log(newCiudad);
            } catch (error) {
                console.error('Error fetching ciudades:', error);
                alert('Error fetching ciudades: ' + error);
            }
        } ,
        async saveCiudad(params?: { id?: string }) {
            let url = `/ciudad`;
            if (params?.id) url += `/${params.id}`;
            try {
                await axiosClient.post(url, params);
                //this.paises = response.data;
            } catch (error) {
                alert(error);
                throw error;  // Añadir para que el error sea capturado en la llamada a save()
            }
        }
    }
});
