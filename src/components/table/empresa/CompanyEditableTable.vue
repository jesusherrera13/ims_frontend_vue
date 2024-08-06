<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCompanyStore } from '@/stores/apps/company';

import { PencilIcon, TrashIcon } from 'vue-tabler-icons';

// aqui se declara
const paises = computed(() => store.paises);
console.log(paises);
const estados = computed(() => store.estados);
console.log(estados);
const municipios = computed(() => store.municipios);
console.log(municipios);
const ciudades = computed(() => store.ciudades);

onMounted(() => {
    store.fetchCompany();
    store.fetchPais();
    store.fetchEstado();
    store.fetchMunicipio();
    store.fetchCiudad();
});

const getCompanies: any = computed(() => {
    return store.companies;
});

// aqui se importan los stores de pais, estado, municipio y ciudad para poder hacer las consultas de los datos de las tablas

const store = useCompanyStore();

const valid = ref(true);
const dialog = ref(false);
const search = ref(''); // se pone en blanco para que no haya nada en el campo de búsqueda
/* const paises = ref(['Mexico', 'USA', 'Canada']);
const estados = ref(['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas']);
const municipios = ref(['Aguascalientes', 'Asientos', 'Calvillo', 'Cosío', 'Jesús María', 'Pabellón de Arteaga', 'Rincón de Romos', 'San José de Gracia', 'Tepezalá', 'El Llano', 'San Francisco de los Romo']); */
const companies = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    razon_social: '',
    nombre_comercial: '',
    calle: '',
    numero_exterior: '',
    numero_interior: '',
    registro_patronal: '',

    pais_id: null,
    municipio_id: null,
    ciudad_id: null,
    estado_id: null
});
const defaultItem = ref({
    id: '',
    razon_social: '',
    nombre_comercial: '',
    calle: '',
    numero_exterior: '',
    numero_interior: '',
    registro_patronal: '',

    pais_id: null,
    municipio_id: null,
    ciudad_id: null,
    estado_id: null
});

// Computed para las listas de selección

// Methods
const filteredList = computed(() => {
    return getCompanies.value.filter((company: any) => {
        return (company.nombre_comercial + '' + company.razonsocial ).toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item: any) {
    editedIndex.value = store.companies.indexOf(item as (typeof store.companies)[0]);
    editedIndex.value = store.paises.indexOf(item as (typeof store.paises)[0]);
    editedIndex.value = store.estados.indexOf(item as (typeof store.estados)[0]);
    editedIndex.value = store.municipios.indexOf(item as (typeof store.municipios)[0]);
    editedIndex.value = store.ciudades.indexOf(item as (typeof store.ciudades)[0]);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    const index = store.companies.indexOf(item as (typeof store.companies)[0]);
    confirm('Are you sure you want to delete this company?') && companies.value.splice(index, 1);
    store.delete();
    store.fetchCompany();
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
function save() {
    // Validaciones de campos obligatorios para la creación de una empresa
    if (!editedItem.value.pais_id) {
        alert('Selecciona un país');
        return;
    }
    if (!editedItem.value.estado_id) {
        alert('Selecciona un estado');
        return;
    }
    if (!editedItem.value.municipio_id) {
        alert('Selecciona un municipio');
        return;
    }
    if (!editedItem.value.ciudad_id) {
        alert('Selecciona una ciudad');
        return;
    }

    if (!editedItem.value.nombre_comercial) {
        alert('Ingresa el nombre comercial');
        return;
    }
    if (!editedItem.value.razon_social) {
        alert('Ingresa la razón social');
        return;
    }
    if (!editedItem.value.calle) {
        alert('Ingresa la calle');
        return;
    }
    if (!editedItem.value.numero_exterior) {
        alert('Ingresa el número exterior');
        return;
    }
    if (!editedItem.value.numero_interior) {
        alert('Ingresa el número interior');
        return;
    }
    if (!editedItem.value.registro_patronal) {
        alert('Ingresa el registro patronal');
        return;
    }
 

    // Guarda la empresa

    if (editedIndex.value > -1) { // si el índice es mayor a -1, significa que se está editando un elemento existente y si no es así, se está creando un nuevo elemento
        // Actualización de un elemento existente
        Object.assign(store.companies[editedIndex.value], editedItem.value);
        // demas arrays de las tablas de pais, estado, municipio y ciudad
        Object.assign(store.paises[editedIndex.value], editedItem.value); // asigna el valor de editedItem.value a la posición del índice en el array de paises en el store y así con los demás
        Object.assign(store.estados[editedIndex.value], editedItem.value);
        Object.assign(store.municipios[editedIndex.value], editedItem.value);
        Object.assign(store.ciudades[editedIndex.value], editedItem.value);
    } else {
        // Creación de un nuevo elemento
        store.companies.push(editedItem.value as typeof store.companies[0]); // Añade la compañía a la lista
    }

    // Guarda la compañía
    store.saveCompany(editedItem.value);

    // Si editedItem.value tiene todos los datos necesarios para cada entidad, simplemente llama las funciones de guardado
    const paisData = { id: editedItem.value.pais_id, name: editedItem.value.pais_id }; 
    const estadoData = { id: editedItem.value.estado_id, name: editedItem.value.estado_id };
    const municipioData = { id: editedItem.value.municipio_id, name: editedItem.value.municipio_id };
    const ciudadData = { id: editedItem.value.ciudad_id, name: editedItem.value.ciudad_id };

    // Guarda cada entidad si no existe ya en la lista de cada entidad en el store (paises, estados, municipios, ciudades)
    if (!store.paises.some((pais:any) => pais.id === paisData.id)) { // si no existe un pais con el mismo id en la lista de paises en el store, entonces guarda el pais
        store.savePais(paisData);   
    }
    if (!store.estados.some((estado:any) => estado.id === estadoData.id)) {
        store.saveEstado(estadoData);
    }
    if (!store.municipios.some((municipio:any) => municipio.id === municipioData.id)) {
        store.saveMunicipio(municipioData);
    }
    if (!store.ciudades.some((ciudad:any) => ciudad.id === ciudadData.id)) {
        store.saveCiudad(ciudadData);
    }

    // Después de guardar, actualiza las listas si es necesario
    store.fetchCompany();
    store.fetchPais();
    store.fetchEstado();
    store.fetchMunicipio();
    store.fetchCiudad();

    close();
}



// Computed Property
const formTitle = computed(() => {
    return editedItem.value.id ? 'Editar compañía' : 'Nueva compañía';
});

/* function render() {
    store.fetchCompany();
    setTimeout(() => {
        getCompanies;
    }, 500);
    close();
} */
</script>

<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field
                density="compact"
                v-model="search"
                label="Ingrese nombre comercial"
                hide-details
                variant="outlined"
            ></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-office-building-plus</v-icon>Agregar Empresa
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <!--    <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.id" label="ID"></v-text-field>
                                </v-col> -->
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.razon_social"
                                        label="Razón Social"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.nombre_comercial"
                                        label="Nombre Comercial"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.calle" label="Calle"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.numero_exterior"
                                        label="Número Exterior"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.numero_interior"
                                        label="Número Interior"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.registro_patronal"
                                        label="Registro Patronal"
                                    ></v-text-field>
                                </v-col>
                           
                                <v-col cols="12" sm="12">
                                    <v-select
                                        v-model="editedItem.pais_id"
                                        :items="paises"
                                        item-text="nombre"
                                        item-value="id"
                                        label="País"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="editedItem.estado_id"
                                        :items="estados"
                                        item-text="nombre"
                                        item-value="id"
                                        label="Estado"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="editedItem.municipio_id"
                                        :items="municipios"
                                        item-text="nombre"
                                        item-value="id"
                                        label="Municipio"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="editedItem.ciudad_id"
                                        :items="ciudades"
                                        item-text="nombre"
                                        onclick="console.log(this)"
                                        item-value="id"
                                        label="Ciudad"
                                    ></v-select>
                                </v-col>
                                <!--    <v-col cols="12" sm="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="estados"
                                        v-model="editedItem.estado"
                                        label="Estado"
                                        @change="store.fetchMunicipios(editedItem.estado)"
                                    ></v-select>
                                </v-col> -->
                                <!--    <v-col cols="12" sm="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="municipios"
                                        v-model="editedItem.municipio"
                                        label="Municipio"
                                    ></v-select>
                                </v-col> -->
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>

                        <v-btn
                            color="secondary"
                            :disabled="editedItem.razon_social == '' || editedItem.nombre_comercial == ''"
                            variant="flat"
                            @click="save"
                            >Guardar</v-btn
                        >
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">ID</th>
                <th class="text-subtitle-1 font-weight-semibold">Razón Social</th>
                <th class="text-subtitle-1 font-weight-semibold">Nombre Comercial</th>
                <th class="text-subtitle-1 font-weight-semibold">Calle</th>
                <!--  <th class="text-subtitle-1 font-weight-semibold">Número Exterior</th>
                <th class="text-subtitle-1 font-weight-semibold">Número Interior</th> -->
                <th class="text-subtitle-1 font-weight-semibold">Registro Patronal</th>
                <!--    <th class="text-subtitle-1 font-weight-semibold">Código Postal</th> -->
                <!--      <th class="text-subtitle-1 font-weight-semibold">Estado</th> -->
                  <th class="text-subtitle-1 font-weight-semibold">Acciones</th> 
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key="item.id">
                <td class="text-subtitle-1">{{ item.id }}</td>
                <td class="text-subtitle-1">{{ item.razon_social }}</td>
                <td class="text-subtitle-1">{{ item.nombre_comercial }}</td>
                <td class="text-subtitle-1">{{ item.calle }}</td>
                <!--    <td class="text-subtitle-1">{{ item.numero_exterior }}</td>
                <td class="text-subtitle-1">{{ item.numero_interior }}</td> -->
                <td class="text-subtitle-1">{{ item.registro_patronal }}</td>
                <!--                <td class="text-subtitle-1">{{ item.codigo_postal }}</td> -->
                <!--      <td>
                    <v-chip :color="item.status" size="small" label>{{ item.status }}</v-chip>
                </td> -->
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Editar">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="editItem(item)" v-bind="props"
                                    ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Eliminar">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(item)" v-bind="props"
                                    ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
