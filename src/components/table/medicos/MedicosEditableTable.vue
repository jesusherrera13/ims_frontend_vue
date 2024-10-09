<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useMedicoStore } from '@/stores/apps/medicos/medico';

import { useEspecialidadStore } from '@/stores/apps/especialidades/especialidad';
import { useEstadoStore } from '@/stores/apps/locaciones/estado';
import { useCiudadStore } from '@/stores/apps/locaciones/ciudad';

import { PencilIcon, TrashIcon } from 'vue-tabler-icons';

const store = useMedicoStore();
const EspecialidadStore = useEspecialidadStore();
const EstadoStore = useEstadoStore();
const CiudadStore = useCiudadStore();

const deleteDialog = ref(false);
const itemToDelete = ref(null);

type AlertType = 'success' | 'error' | 'info' | 'warning' | undefined;

onMounted(async () => {
    store.fetchMedicos();
    EspecialidadStore.fetchEspecialidades();
    EstadoStore.fetchEstados();
    CiudadStore.fetchCiudades();
});

const getMedicos: any = computed(() => {
    return store.medicos;
});

const getEspecialidades: any = computed(() => {
    return EspecialidadStore.especialidades.sort((a: any, b: any) => {
        const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
        const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
});


const getEstados: any = computed(() => {
    return EstadoStore.estados.sort((a: any, b: any) => {
        const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
        const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
});

const getCiudades: any = computed(() => {
    return CiudadStore.ciudades.sort((a: any, b: any) => {
        const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
        const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const editedIndex = ref(-1);
const items = ref(getMedicos);
const especialidades = ref(getEspecialidades);
const estados = ref(getEstados);
const ciudades = ref(getCiudades);

interface Alert {
    show: boolean;
    type: AlertType;
    message: string;
}

const alert = ref<Alert>({
    show: false,
    type: undefined,
    message: ''
});


const editedItem = ref({
    id: '',
    nombre: '',
    rfc: '',
    direccion: '',
    cp: '',
    ciudad_id: null,
    estado_id: null,
    genero: '',
    especialidad_id: null
});

const defaultItem = ref({
    id: '',
    nombre: '',
    rfc: '',
    direccion: '',
    cp: '',
    ciudad_id: null,
    estado_id: null,
    genero: '',
    especialidad_id: null
});

const headers: any = ref([
    { title: 'Nombre', align: 'start', key: 'nombre' },
    { title: 'Rfc', align: 'start', key: 'rfc' },
    { title: 'Direccion', align: 'start', key: 'direccion' },
    { title: 'CP', align: 'start', key: 'cp' },
    { title: 'Ciudad', align: 'start', key: 'nombre_ciudad' },
    { title: 'Estado', align: 'start', key: 'nombre_estado' },
    { title: 'Genero', align: 'start', key: 'genero' },
    { title: 'ID Esp', align: 'start', key: 'nombre_especialidad' },
    //{ title: 'Foto de Perfil', align: 'start', key: 'foto_perfil' },
    { title: 'Acciones', align: 'end', key: 'actions', sortable: false }
]);

function showAlert(type: AlertType, message: string) {
    alert.value = {
        show: true,
        type,
        message
    };
    setTimeout(() => {
        alert.value.show = false;
    }, 3000);
}

async function editItem(item:any) {
  // Verifica si las ciudades ya están cargadas en el store
  if (!CiudadStore.ciudades.length) {
    await CiudadStore.fetchCiudades();  // Asegúrate de que se llame al método del store
  }

  // Asignar los valores del ítem editado a `editedItem`
  editedItem.value = {
    ...item,
    ciudad_id: item.ciudad_id ?? null,
    estado_id: item.estado_id ?? null,
    especialidad_id: item.especialidad_id ?? null,
  };

  // Abrir el diálogo de edición
  dialog.value = true;
}


function deleteItem(item: any) {
    itemToDelete.value = item;
    deleteDialog.value = true;
}

async function confirmDelete() {
    try {
        Object.assign(store.medico, itemToDelete.value);
        const response = store.delete();

        response.then(() => {
            store.fetchMedicos();
            showAlert('success', 'Médico eliminado con éxito');
        }).catch(error => {
            showAlert('error', 'Error al eliminar el Médico');
        });

    } catch (error) {
        showAlert('error', 'Error al eliminar el Médico');
    } finally {
        deleteDialog.value = false;
        itemToDelete.value = null;
    }
}

function save() {
    Object.assign(store.medico, editedItem.value);
    let response;
    if (store.medico.id) {
        response = store.update();
        showAlert('success', 'Médico actualizado con éxito');
    } else {
        response = store.store();
        showAlert('success', 'Médico guardado con éxito');
    }

    response.then(() => {
        store.fetchMedicos();
    }).catch(error => {
        showAlert('error', 'Error al guardar el Médico');
    });

    editedItem.value = Object.assign({}, defaultItem.value);
    close();
}

function openDialog() {
    editedItem.value = { ...defaultItem.value };
    editedIndex.value = -1;
    dialog.value = true;
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = { ...defaultItem.value };
        editedIndex.value = -1;
    }, 300);
}

function refresh() {
    store.fetchMedicos();
}

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nuevo Médico' : 'Editar Médico';
});
</script>

<style>
.v-pagination__list {
    justify-content: end;
}

.alert-container {
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 9999;
    width: 300px;
}

</style>

<template>

    <div class="alert-container">
        <v-alert v-if="alert.show" :type="alert.type" class="mb-4" prominent>
            <h5 class="text-h6 text-capitalize">{{ alert.type }}</h5>
            <div>{{ alert.message }}</div>
        </v-alert>
    </div>

    <v-dialog v-model="deleteDialog" persistent max-width="500">
        <v-card>
            <v-card-title class="headline">Confirmar Eliminación</v-card-title>
            <v-card-text>
                ¿Estás seguro de que deseas eliminar este Médico?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
                <v-btn color="success" variant="text" @click="confirmDelete">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Buscar" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-btn color="secondary" flat class="mr-1" @click="refresh">
                <v-icon class="mr-2">mdi-refresh</v-icon>
                Actualizar
            </v-btn>
            <v-dialog v-model="dialog" max-width="500" persistent>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Nuevo medico
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        variant="outlined" 
                                        hide-details 
                                        v-model="editedItem.nombre" 
                                        label="Nombre">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                        variant="outlined" 
                                        hide-details 
                                        v-model="editedItem.rfc" 
                                        label="Rfc">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                        variant="outlined" 
                                        hide-details 
                                        v-model="editedItem.direccion" 
                                        label="Dirección">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                        variant="outlined" 
                                        hide-details 
                                        v-model="editedItem.cp" 
                                        label="Cp">
                                    </v-text-field>
                                </v-col>
                                
                                <v-col cols="12">
                                    <v-autocomplete
                                        variant="outlined"
                                        hide-details
                                        :items="estados"
                                        item-title="nombre"
                                        item-value="id"
                                        v-model="editedItem.estado_id"
                                        label="Estado"
                                    ></v-autocomplete>
                                </v-col>

                                <v-col cols="12">
                                    <v-autocomplete
                                        variant="outlined"
                                        hide-details
                                        :items="ciudades"
                                        item-title="nombre"
                                        item-value="id"
                                        v-model="editedItem.ciudad_id"
                                        label="Ciudad"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.genero"
                                        :items="['masculino', 'femenino', 'otro']"
                                        label="Género"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12">
                                    <v-autocomplete
                                        variant="outlined"
                                        hide-details
                                        :items="especialidades"
                                        item-title="nombre"
                                        item-value="id"
                                        v-model="editedItem.especialidad_id"
                                        label="Especialidad"
                                    ></v-autocomplete>
                                </v-col>
                                
                              
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                        <v-btn color="secondary" :disabled="editedItem.nombre == '' || editedItem.rfc == '' || editedItem.direccion == '' || editedItem.cp == '' || editedItem.ciudad_id == '' || editedItem.estado_id == '' || editedItem.genero == ''" variant="flat" @click="save"
                            >Guardar</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table
                items-per-page="25"
                :headers="headers"
                :items="items"
                :search="search"
                class="border rounded-md"
                density="compact"
            >
                <template v-slot:item.actions="{ item }">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" v-bind="props" variant="plain"></v-btn>
                        </template>

                        <v-list density="compact" nav>
                            <v-list-item value="editar" prepend-icon="mdi-square-edit-outline" @click="editItem(item)">
                                <v-list-item-title>Editar</v-list-item-title>
                            </v-list-item>
                            <v-list-item value="eliminar" prepend-icon="mdi-delete" @click="deleteItem(item)">
                                <v-list-item-title>Eliminar</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
    <v-overlay v-model="store.is_loading"></v-overlay>
</template>
