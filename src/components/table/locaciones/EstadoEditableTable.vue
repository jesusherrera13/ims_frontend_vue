<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useEstadoStore } from '@/stores/apps/estado';
import { PencilIcon, TrashIcon } from 'vue-tabler-icons';

const store = useEstadoStore();
const itemsPerPage = ref(5);
const page = ref(1);
const deleteDialog = ref(false);
const itemToDelete = ref(null);

type AlertType = 'success' | 'error' | 'info' | 'warning' | undefined;

onMounted(async () => {
    store.fetchEstados();
});

const getEstados: any = computed(() => {
    return store.estados.filter((estado: any) => {
        return (estado.id + ' ' + estado.nombre).toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedList = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return getEstados.value.slice(start, end);
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const editedIndex = ref(-1);

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
    pais_id: ''
});

const defaultItem = ref({
    id: '',
    nombre: '',
    pais_id: ''
});

watch(getEstados, (newList) => {
    if ((page.value - 1) * itemsPerPage.value >= newList.length) {
        page.value = 1;
    }
});

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
        Object.assign(store.estado, itemToDelete.value);
        const response = store.delete();

        response.then(() => {
            store.fetchEstados();
            showAlert('success', 'Estado eliminado con éxito');
        }).catch(error => {
            showAlert('error', 'Error al eliminar el Estado');
        });

    } catch (error) {
        showAlert('error', 'Error al eliminar el Estado');
    } finally {
        deleteDialog.value = false;
        itemToDelete.value = null;
    }
}

function save() {
    Object.assign(store.estado, editedItem.value);
    let response;
    if (store.estado.id) {
        response = store.update();
        showAlert('success', 'Estado actualizado con éxito');
    } else {
        response = store.store();
        showAlert('success', 'Estado guardado con éxito');
    }

    response.then(() => {
        store.fetchEstados();
    }).catch(error => {
        showAlert('error', 'Error al guardar el Estado');
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

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nuevo Estado' : 'Editar Estado';
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
                ¿Estás seguro de que deseas eliminar este Estado?
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
            <v-text-field density="compact" v-model="search" label="Buscar Estados" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto" @click="openDialog">
                        <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>Agregar Estado
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.nombre"
                                        label="Nombre"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.pais_id"
                                        label="Id Pais"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                        <v-btn
                            color="secondary"
                            :disabled="editedItem.nombre == '' || editedItem.pais_id == ''"
                            variant="flat"
                            @click="save"
                            >Guardar</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-table class="mt-5" :items-per-page="itemsPerPage" :page.sync="page">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">Id</th>
                <th class="text-subtitle-1 font-weight-semibold">Nombre</th>
                <th class="text-subtitle-1 font-weight-semibold">Id Pais</th>
                <th class="text-subtitle-1 font-weight-semibold">Fecha de creacion</th>
                <th class="text-subtitle-1 font-weight-semibold">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in paginatedList" :key="item.id">
                <td class="text-subtitle-1">{{ item.id }}</td>
                <td>
                    <div class=" py-4">
                        <div>
                            <v-img :src="item.avatar" width="45px" class="rounded-circle img-fluid"></v-img>
                        </div>

                        <div class="ml-5">
                            <h4 class="text-h6">{{ item.nombre }}</h4>
                        </div>
                    </div>
                </td>
                <td class="text-subtitle-1">{{ item.pais_id }}</td>
                <td class="text-subtitle-1">{{ item.created_at }}</td>
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
        <template v-slot:bottom>
            <div class="justify-end">
                <v-pagination v-model="page" :length="Math.ceil(getEstados.length / itemsPerPage)" style="justify-content: end!important;" />
            </div>
        </template>
    </v-table>
    <v-overlay v-model="store.is_loading"></v-overlay>
</template>
