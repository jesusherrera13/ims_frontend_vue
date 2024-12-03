<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRecetaStore } from '@/stores/apps/recetas/receta'; // Tu store de recetas
import { usePacienteStore } from '@/stores/apps/pacientes/paciente'; // Store para pacientes
import { useEspecialidadStore } from '@/stores/apps/especialidades/especialidad'; // Store para especialidades

import { PencilIcon, TrashIcon } from 'vue-tabler-icons';

const store = useRecetaStore();
const PacienteStore = usePacienteStore();
const EspecialidadStore = useEspecialidadStore();

const deleteDialog = ref(false);
const itemToDelete = ref(null);

type AlertType = 'success' | 'error' | 'info' | 'warning' | undefined;

onMounted(async () => {
    store.fetchRecetas();
    PacienteStore.fetchPacientes();
    EspecialidadStore.fetchEspecialidades();
});

const getRecetas: any = computed(() => {
    return store.recetas;
});

const getPacientes: any = computed(() => {
    return PacienteStore.pacientes;
});

const getEspecialidades: any = computed(() => {
    return EspecialidadStore.especialidades;
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const editedIndex = ref(-1);
const items = ref(getRecetas);
const pacientes = ref(getPacientes);
const especialidades = ref(getEspecialidades);

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
    id_receta: '',
    paciente_id: '',
    especialidad_id: '',
    descrip: '',
    fecha: '',
    sta: ''
});

const defaultItem = ref({
    id_receta: '',
    paciente_id: '',
    especialidad_id: '',
    descrip: '',
    fecha: '',
    sta: ''
});

const headers: any = ref([
    { title: 'Paciente', align: 'start', key: 'nombre_paciente' },
    { title: 'Especialidad', align: 'start', key: 'nombre_especialidad' },
    { title: 'Descripción', align: 'start', key: 'descrip' },
    { title: 'Fecha', align: 'start', key: 'fecha' },
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

function editItem(item: any) {
    editedIndex.value = store.recetas.indexOf(item as (typeof store.recetas)[0])
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}

function deleteItem(item: any) {
    itemToDelete.value = item;
    deleteDialog.value = true;
}

async function confirmDelete() {
    try {
        Object.assign(store.receta, itemToDelete.value);
        const response = store.delete();

        response.then(() => {
            store.fetchRecetas();
            showAlert('success', 'Receta eliminada con éxito');
        }).catch(error => {
            showAlert('error', 'Error al eliminar la Receta');
        });

    } catch (error) {
        showAlert('error', 'Error al eliminar la Receta');
    } finally {
        deleteDialog.value = false;
        itemToDelete.value = null;
    }
}

function save() {
    Object.assign(store.receta, editedItem.value);
    let response;
    if (store.receta.id_receta) {
        response = store.update();
        showAlert('success', 'Receta actualizada con éxito');
    } else {
        response = store.store();
        showAlert('success', 'Receta guardada con éxito');
    }

    response.then(() => {
        store.fetchRecetas();
    }).catch(error => {
        showAlert('error', 'Error al guardar la Receta');
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
    store.fetchRecetas();
}

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nueva Receta' : 'Editar Receta';
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
                ¿Estás seguro de que deseas eliminar esta Receta?
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
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Nueva Receta
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
                                    <v-autocomplete
                                        variant="outlined"
                                        hide-details
                                        :items="pacientes"
                                        item-title="nombre"
                                        item-value="id"
                                        v-model="editedItem.paciente_id"
                                        label="Paciente"
                                    ></v-autocomplete>
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
                                <v-col cols="12">
                                    <v-text-field 
                                        variant="outlined" 
                                        hide-details 
                                        v-model="editedItem.descrip" 
                                        label="Descripción">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                        variant="outlined" 
                                        type="date"
                                        hide-details 
                                        v-model="editedItem.fecha" 
                                        label="Fecha">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                        variant="outlined" 
                                        hide-details 
                                        v-model="editedItem.sta" 
                                        label="Estado (sta)">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                        <v-btn color="secondary" :disabled="editedItem.paciente_id == '' || editedItem.especialidad_id == ''" variant="flat" @click="save"
                            >Guardar</v-btn>
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
