<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useDepartamentoStore } from '@/stores/apps/empresa/departamento';
import { useCompaniaStore } from '@/stores/apps/empresa/compania';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// import contact from '@/_mockApis/apps/contact';
import { PencilIcon, TrashIcon } from 'vue-tabler-icons';

const store = useDepartamentoStore();
const auth = useAuthStore();
const router = useRouter();
const storeCompania = useCompaniaStore();

onMounted(() => {
    store.fetchDepartamentos();
    storeCompania.fetchCompanias();
});

const getDepartamentos: any = computed(() => {
    return store.departamentos.sort((a: any, b: any) => {
        const nameA = a.department_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.department_name.toUpperCase(); // ignore upper and lowercase

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

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const editedIndex = ref(-1);
const items = ref(getDepartamentos);
const companias = ref(getCompanias);

const editedItem = ref({
    id: '',
    department_name: '',
    company_id: ''
});

const defaultItem = ref({
    id: '',
    department_name: '',
    company_id: ''
});

const headers: any = ref([
    { title: 'Nombre', align: 'start', key: 'department_name' },
    { title: 'Compañía', align: 'start', key: 'company_name' },
    { title: 'Acciones', align: 'end', key: 'actions', sortable: false }
]);

//Methods
function editItem(item: any) {
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    if (confirm('Are you sure you want to delete this item?')) {
        Object.assign(store.departamento, item);

        let response = store.delete();
        response.then(() => {
            store.fetchDepartamentos();
        });
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
    Object.assign(store.departamento, editedItem.value);

    let response;
    if (store.departamento.id) response = store.update();
    else response = store.store();

    response.then(() => {
        store.fetchDepartamentos();
    });

    editedItem.value = Object.assign({}, defaultItem.value);
    close();
}

function refresh() {
    store.fetchDepartamentos();
}

function goTo(item: any) {
    // console.log(item);
    router.push(`/departamento/profile/${item.id}`);
}

//Computed Property
const formTitle = computed(() => {
    return editedItem.value.id ? 'Editar departamento' : 'Nuevo departamento';
});
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
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Nuevo departamento
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
                                        :items="companias"
                                        item-title="company_name"
                                        item-value="id"
                                        v-model="editedItem.company_id"
                                        label="Compañía"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.department_name"
                                        label="Nombre"
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
                            :disabled="editedItem.company_id == '' || editedItem.department_name == ''"
                            variant="flat"
                            @click="save"
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
