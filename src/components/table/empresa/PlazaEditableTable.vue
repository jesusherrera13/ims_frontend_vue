<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePlazaStore } from '@/stores/apps/plaza';
import { useEmpresaStore } from '@/stores/apps/empresa/empresa';
import { useCompaniaStore } from '@/stores/apps/empresa/compania';
import { PencilIcon, TrashIcon } from 'vue-tabler-icons';

const store = usePlazaStore();
const storeEmpresa = useEmpresaStore();
const storeCompania = useCompaniaStore();

onMounted(() => {
    store.fetchPlazas();
    storeEmpresa.fetchEmpresas();
    storeCompania.fetchCompanias();
});

/* const getPlazas = computed(() => {
    return store.plazas;
}); */

const getPlazas: any = computed(() => {
    return store.plazas.sort((a: any, b: any) => {
        const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
        const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
});

const getCompanias: any = computed(() => {
    return storeCompania.companias.sort((a: any, b: any) => {
        const nameA = a.company_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.company_name.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
});

const getEmpresas: any = computed(() => {
    if (editedItem.value.company_id) {
        storeEmpresa.empresas.sort((a: any, b: any) => {
            const nameA = a.nombre_comercial.toUpperCase(); // ignore upper and lowercase
            const nameB = b.nombre_comercial.toUpperCase(); // ignore upper and lowercase

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;

            // names must be equal
            return 0;
        });

        return storeEmpresa.empresas.filter((item: any, index) => {
            return editedItem.value.company_id ? item.company_id == editedItem.value.company_id : item;
        });
    } else return [];
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const selected_company = ref({});

const items = ref(getPlazas);
const empresas = ref(getEmpresas);
const companias = ref(getCompanias);

const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    nombre: '',
    empresa_id: '',
    company_id: '',
    created_by: '',
    created_at: ''
});
const defaultItem = ref({
    id: '',
    nombre: '',
    empresa_id: '',
    company_id: '',
    created_by: '',
    created_at: ''
});

const headers: any = ref([
    { title: 'Nombre', align: 'start', key: 'nombre' },
    { title: 'Empresa', align: 'start', key: 'razon_social' },
    { title: 'Acciones', align: 'end', key: 'actions', sortable: false }
]);

// Método para filtrar la lista de plazas
const filteredList = computed<Array<{ id: number; nombre: string; created_by: string; empresa_id: string; created_at: string }>>(() => {
    return getPlazas.value.filter((plaza: any) => {
        return plaza.nombre.toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item: any) {
    editedIndex.value = store.plazas.findIndex((plaza: { id: number }) => plaza.id === item.id);
    editedItem.value = Object.assign({}, item, { id: item.id.toString() });
    dialog.value = true;
}

function deleteItem(item: any) {
    if (confirm('¿Estás seguro de que quieres eliminar esta plaza?')) {
        Object.assign(store.plaza, item);
        store.delete();
    }
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}

function save() {
    Object.assign(store.plaza, editedItem.value);
    let response;
    if (store.plaza.id) response = store.update();
    else response = store.store();

    response.then(() => {
        store.fetchPlazas();
    });

    editedItem.value = Object.assign({}, defaultItem.value);
    close();
}

// Computed Property para el título del formulario
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nueva Plaza' : 'Editar Plaza';
});

function empresaReset() {
    editedItem.value.empresa_id = '';
}

function refresh() {
    store.fetchPlazas();
}

function goTo(item: any) {}
</script>

<template>
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
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Nueva Plaza
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
                                        label="Razón social"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-autocomplete
                                        variant="outlined"
                                        hide-details
                                        :items="companias"
                                        item-title="company_name"
                                        item-value="id"
                                        v-model="editedItem.company_id"
                                        label="Compañía"
                                        @update:modelValue="empresaReset"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                    <v-autocomplete
                                        variant="outlined"
                                        hide-details
                                        :items="empresas"
                                        item-title="razon_social"
                                        item-value="id"
                                        v-model="editedItem.empresa_id"
                                        label="Empresa"

                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                        <v-btn color="secondary" :disabled="editedItem.nombre == ''" variant="flat" @click="save">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <!-- <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">ID</th>
                <th class="text-subtitle-1 font-weight-semibold">Plaza</th>
                <th class="text-subtitle-1 font-weight-semibold">Empresa</th>
                <th class="text-subtitle-1 font-weight-semibold text-right">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key="item.id">
                <td class="text-subtitle-1">{{ item.id }}</td>
                <td class="text-subtitle-1">{{ item.nombre }}</td>
                <td class="text-subtitle-1">{{ item.empresa_id }}</td>
                <td>
                    <div class="d-flex align-center justify-end">
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
    </v-table> -->
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
                            <v-list-item value="configurar" prepend-icon="mdi-cog" @click="goTo(item)">
                                <v-list-item-title>Configurar</v-list-item-title>
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
