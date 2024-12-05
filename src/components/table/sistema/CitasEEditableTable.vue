<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useCitasEStore } from '@/stores/apps/citasE';
import { PencilIcon, TrashIcon } from 'vue-tabler-icons';
import axios from 'axios';

const store = useCitasEStore();
const menu = ref(false);
const especialidades = ref([]);
const selectedEspecialidad = ref(null);

//onMounted(async ()=>{
 //   try {
  //      const response = await axios.get('/api/perfiles');
    //    especialidades.value = response.data;
    // } catch (error){
       // console.error("Error al obtener las especialidades:", error);
    // }
// })

onMounted(() => {
    store.fetchCitasE();
});

const getCitasE: any = computed(() => {
    return store.citasE.filter((citaE: any) => {
        const paciente = citaE.paciente || '';
        return (paciente).toLowerCase().includes(search.value.toLowerCase());
    });
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const editedIndex = ref(-1);
const citasE = ref<any[]>([]);
const editedItem = ref({
    id: '',
    paciente: '',
    especialidadM: '',
    doctor: '',
    fecha: '',
    efectividad: 'no efectiva' // Valor inicial predeterminado
});
const defaultItem = ref({
    id: '',
    paciente: '',
    especialidadM: '',
    doctor: '',
    fecha: '',
    efectividad: 'no efectiva'
});
const errorMessage = ref('');

// Métodos

function editItem(item: any) {
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}

function deleteItem(item: any) {
    if (confirm('Are you sure you want to delete this medical appointment?')) {
        Object.assign(store.citaE, item);
        let response = store.delete();
        response.then(() => {
            store.fetchCitasE();
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
    // Verificar si algun dato está vacio
    if (!editedItem.value.paciente.trim()) {
        errorMessage.value = 'Favor de llenar los datos';
        return;
    }

    errorMessage.value = '';

    Object.assign(store.citaE, editedItem.value);
    let response;
    if (store.citaE.id) response = store.update();
    else response = store.store();

    response.then(() => {
        store.fetchCitasE();
    });

    editedItem.value = Object.assign({}, defaultItem.value);
    close();
}

// Watcher para detectar cambios en los datos de la cita y ocultar el mensaje de error
watch([() => editedItem.value.paciente], () => {
    errorMessage.value = '';
});

// Computed Property
const formTitle = computed(() => {
    return !editedItem.value.id ? 'Nueva cita' : 'Editar cita';
});
</script>

<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Buscar cita" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500" persistent>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Añadir cita
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
                                        v-model="editedItem.paciente"
                                        label="Nombre del paciente"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="selectedEspecialidad"
                                        :items="especialidades"
                                        item-text="nombre"
                                        item-value="id"
                                        label="Especialidad medica"
                                        Outlined
                                        dense
                                        chips
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.doctor"
                                        label="Doctor"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.fecha"
                                                label="Fecha"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="editedItem.fecha"
                                            @input="menu = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        v-model="editedItem.efectividad"
                                        :items="['efectiva', 'no efectiva']"
                                        label="¿Cita efectiva?"
                                        hide-details
                                    ></v-select>
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
                            :disabled="editedItem.paciente.trim() == ''"
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
                <th class="text-subtitle-1 font-weight-semibold">Nombre del paciente</th>
                <th class="text-subtitle-1 font-weight-semibold">Especialidad medica</th>
                <th class="text-subtitle-1 font-weight-semibold">Doctor</th>
                <th class="text-subtitle-1 font-weight-semibold">Fecha</th>
                <th class="text-subtitle-1 font-weight-semibold">Efectividad</th>
                <th class="text-subtitle-1 font-weight-semibold text-right">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in getCitasE" :key="item.id">
                <td class="text-subtitle-1">{{ item.paciente }}</td>
                <td class="text-subtitle-1">{{ item.especialidadM }}</td>
                <td class="text-subtitle-1">{{ item.doctor }}</td>
                <td class="text-subtitle-1">{{ item.fecha }}</td>
                <td class="text-subtitle-1">{{ item.efectividad === 'efectiva' ? 'Efectiva' : 'No efectiva' }}</td>
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