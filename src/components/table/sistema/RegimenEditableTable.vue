<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRegimenStore } from '@/stores/apps/regimen';
import { PencilIcon, TrashIcon } from 'vue-tabler-icons';

const store = useRegimenStore();

onMounted(() => {
    store.fetchRegimen();
});

const getRegimen: any = computed(() => {
    return store.regimenes.filter((regimen: any) => {
        return (regimen.clave + ' ' + regimen.nombre).toLowerCase().includes(search.value.toLowerCase());
    });
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const editedIndex = ref(-1);
const regimenes = ref<any[]>([]);
const editedItem = ref({
    id: '',
    clave: '',
    nombre: '',
});
const defaultItem = ref({
    id: '',
    clave: '',
    nombre: '',
});
const errorMessage = ref('');

// Métodos

function editItem(item: any) {
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}

function deleteItem(item: any) {
    if (confirm('Are you sure you want to delete this regimen?')) {
        Object.assign(store.regimen, item);
        let response = store.delete();
        response.then(() => {
            store.fetchRegimen();
        });
    }
}

function close() {
    dialog.value = false;
    errorMessage.value = ''; // Reiniciar el mensaje de error al cerrar el diálogo
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}

function save() {
    // Verificar si la clave o el nombre del régimen están vacíos
    if (!editedItem.value.clave.trim() || !editedItem.value.nombre.trim()) {
        errorMessage.value = 'Favor de llenar los datos';
        return;
    }

    // Verificar si la clave o el nombre del régimen ya existen
    const existingRegimen = store.regimenes.find(
        (regimen: any) => 
            (regimen.clave.toLowerCase() === editedItem.value.clave.toLowerCase() || 
            regimen.nombre.toLowerCase() === editedItem.value.nombre.toLowerCase()) && 
            regimen.id !== editedItem.value.id
    );

    if (existingRegimen) {
        errorMessage.value = 'Esta clave o este régimen ya existe';
        return;
    }

    errorMessage.value = '';

    Object.assign(store.regimen, editedItem.value);
    let response;
    if (store.regimen.id) response = store.update();
    else response = store.store();

    response.then(() => {
        store.fetchRegimen();
    });

    editedItem.value = Object.assign({}, defaultItem.value);
    close();
}

// Watcher para detectar cambios en la clave y el nombre del régimen y ocultar el mensaje de error
watch([() => editedItem.value.clave, () => editedItem.value.nombre], () => {
    errorMessage.value = '';
});

// Computed Property
const formTitle = computed(() => {
    return !editedItem.value.id ? 'Nuevo régimen' : 'Editar régimen';
});
</script>

<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Buscar régimen" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Añadir Régimen
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
                                        v-model="editedItem.clave"
                                        label="Clave del régimen"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.nombre"
                                        label="Nombre del régimen"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                        <v-btn
                            color="secondary"
                            :disabled="editedItem.clave.trim() == '' || editedItem.nombre.trim() == ''"
                            variant="flat"
                            @click="save"
                            >Guardar</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">Clave</th>
                <th class="text-subtitle-1 font-weight-semibold">Régimen</th>
                <th class="text-subtitle-1 font-weight-semibold text-right">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in getRegimen" :key="item.id">
                <td class="text-subtitle-1">{{ item.clave }}</td>
                <td class="text-subtitle-1">{{ item.nombre }}</td>
                <td class="text-right">
                    <div class="d-flex justify-end align-center">
                        <v-tooltip text="Editar">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="editItem(item)" v-bind="props">
                                    <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Eliminar">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(item)" v-bind="props">
                                    <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<style scoped>
.error-message {
    color: red;
    font-size: 0.875rem;
}
</style>
