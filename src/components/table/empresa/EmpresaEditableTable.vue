<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useEmpresaStore } from '@/stores/apps/empresa/empresa';
import { useAuthStore } from '@/stores/auth';
import { useRolStore } from '@/stores/apps/rol';
import { useRouter } from 'vue-router';

// import contact from '@/_mockApis/apps/contact';
import { PencilIcon, TrashIcon } from 'vue-tabler-icons';

const store = useEmpresaStore();
const auth = useAuthStore();
const rolStore = useRolStore();
const router = useRouter();

onMounted(() => {
    store.fetchEmpresas();
    rolStore.fetchRoles();
});

const getEmpresas: any = computed(() => {
    return store.empresas.sort((a: any, b: any) => {
        const nameA = a.razon_social.toUpperCase(); // ignore upper and lowercase
        const nameB = b.razon_social.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
});

const getRoles: any = computed(() => {
    return rolStore.roles.sort((a: any, b: any) => {
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
const items = ref(getEmpresas);
const roles = ref(getRoles);

const editedItem = ref({
    id: '',
    razon_social: '',
    nombre_comercial: '',
    rfc: '',
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
    rfc: '',
    calle: '',
    numero_exterior: '',
    numero_interior: '',
    registro_patronal: '',

    pais_id: null,
    municipio_id: null,
    ciudad_id: null,
    estado_id: null
});

const headers: any = ref([
    { title: 'Razón Social', align: 'start', key: 'razon_social' },
    { title: 'RFC', align: 'start', key: 'rfc' },
    { title: 'Acciones', align: 'end', key: 'actions', sortable: false }
]);

//Methods
function editItem(item: any) {
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    if (confirm('Are you sure you want to delete this item?')) {
        Object.assign(store.empresa, item); //asigna el item seleccionado a la variable empresa del store    
        console.log(item);

        let response = store.delete(); //llama al metodo delete del store
        response.then(() => { //si la respuesta es exitosa, se actualiza la tabla
            store.fetchEmpresas(); //llama al metodo fetchEmpresas del store
        });
    }
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value); //limpia el formulario
        editedIndex.value = -1; //resetea el index
    }, 300);
}

function save() {
    Object.assign(store.empresa, editedItem.value); //asigna el valor del formulario a la variable empresa del store

    console.log(editedItem.value);

    let response; //variable para almacenar la respuesta del store
    if (store.empresa.id) response = store.update(); //si el id de la empresa es diferente de null, llama al metodo update del store
    else response = store.store(); //si el id de la empresa es null, llama al metodo store del store

    response.then(() => {
        store.fetchEmpresas();
    });

    editedItem.value = Object.assign({}, defaultItem.value);
    close();
}

function refresh() {
    store.fetchEmpresas();
}

function goTo(item: any) {
    // console.log(item);
    router.push(`/empresa/profile/${item.id}`); //sirve para redirigir a la vista de perfil de la empresa seleccionada en la tabla
}

//Computed Property
const formTitle = computed(() => {
    return editedItem.value.id ? 'Editar empresa' : 'Nueva empresa';
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
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Nueva empresa
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
                                        v-model="editedItem.razon_social"
                                        label="Razón social"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.nombre_comercial"
                                        label="Nombre comercial"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.rfc" label="RFC"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                        <v-btn
                            color="secondary"
                            :disabled="editedItem.razon_social == '' || editedItem.nombre_comercial == '' || editedItem.rfc == ''"
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
