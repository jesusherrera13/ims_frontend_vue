<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useMunicipioStore } from '@/stores/apps/locaciones/municipio';

import { useEstadoStore } from '@/stores/apps/locaciones/estado';

import { PencilIcon, TrashIcon } from 'vue-tabler-icons';

const store = useMunicipioStore();
const EstadoStore = useEstadoStore();

const deleteDialog = ref(false);
const itemToDelete = ref(null);

type AlertType = 'success' | 'error' | 'info' | 'warning' | undefined;

onMounted(async () => {
    store.fetchMunicipios();
    EstadoStore.fetchEstados();
});

const getMunicipios: any = computed(() => {
    return store.municipios;
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

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const editedIndex = ref(-1);
const items = ref(getMunicipios);
const estados = ref(getEstados);

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
    codigo: '',
    estado_id: null
});

const defaultItem = ref({
    id: '',
    nombre: '',
    codigo: '',
    estado_id: null
});

const headers: any = ref([
    { title: 'Municipio', align: 'start', key: 'nombre' },
    { title: 'Código', align: 'start', key: 'codigo' },
    { title: 'Estado', align: 'start', key: 'nombre_estado' },
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
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}

function deleteItem(item: any) {
    itemToDelete.value = item;
    deleteDialog.value = true;
}

async function confirmDelete() {
    try {
        Object.assign(store.municipio, itemToDelete.value);
        const response = store.delete();

        response.then(() => {
            store.fetchMunicipios();
            showAlert('success', 'Municipio eliminado con éxito');
        }).catch(error => {
            showAlert('error', 'Error al eliminar el Municipio');
        });

    } catch (error) {
        showAlert('error', 'Error al eliminar el Municipio');
    } finally {
        deleteDialog.value = false;
        itemToDelete.value = null;
    }
}

function save() {
    Object.assign(store.municipio, editedItem.value);
    let response;
    if (store.municipio.id) {
        response = store.update();
        showAlert('success', 'Municipio actualizado con éxito');
    } else {
        response = store.store();
        showAlert('success', 'Municipio guardado con éxito');
    }

    response.then(() => {
        store.fetchMunicipios();
    }).catch(error => {
        showAlert('error', 'Error al guardar el Municipio');
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
    store.fetchMunicipios();
}


const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nuevo Municipio' : 'Editar Municipio';
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
                ¿Estás seguro de que deseas eliminar este Municipio?
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
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Nuevo municipio
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
                                        label="Municipio">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                        variant="outlined" 
                                        hide-details 
                                        v-model="editedItem.codigo" 
                                        label="Código">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
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
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                        <v-btn color="secondary" :disabled="editedItem.nombre == '' || editedItem.estado_id == ''" variant="flat" @click="save"
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
