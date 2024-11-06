<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { usePacienteStore } from '@/stores/apps/pacientes/paciente';
import {useCitaStore } from '@/stores/apps/cita/cita'
//import { useReligionStore } from '@/stores/apps/religiones/religion';
import { useMedicoStore } from '@/stores/apps/medicos/medico';
import { useEspecialidadStore } from '@/stores/apps/especialidades/especialidad';
import { formatearFecha,formatearHoraMinutos } from '@/helpers/helpers';


import { PencilIcon, TrashIcon ,TimelineEventIcon } from 'vue-tabler-icons';


const store = useCitaStore();
//const ReligionStore = useReligionStore();
const PacienteStore = usePacienteStore();
const MedicoStore = useMedicoStore();
const EspecialidadStore = useEspecialidadStore();


type AlertType = 'success' | 'error' | 'info' | 'warning' | undefined;

onMounted(async () => {
    store.fetchCitas();
    store.fetchPaciente();
    MedicoStore.fetchMedicos();
    EspecialidadStore.fetchEspecialidades();


    //ReligionStore.fetchReligiones();
});

const getCitas: any = computed(() => {
    return store.citas;
});

// Propiedad computada para los intervalos de tiempo
const timeIntervals = computed(() => {
    return generateTimeIntervals(startTime.value, endTime.value, intervalMinutes.value);
});


const Especialidad: any = computed(() => {
    return EspecialidadStore.especialidades.sort((a: any, b: any) => {
        const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
        const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
}); 

const Paciente: any = computed(() => {
    return store.pacientes.sort((a: any, b: any) => {
        const nameA = `${a.nombre} ${a.apellido1}`.toUpperCase(); // ignore upper and lowercase
        const nameB = `${b.nombre} ${b.apellido1}`.toUpperCase();
         // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
});

const Medicos: any = computed(() => {
    return MedicoStore.medicos.sort((a: any, b: any) => {
        const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
        const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
});


// propiedades 
const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const editedIndex = ref(-1);
const items = ref(getCitas);

const pacientes =ref(Paciente)
const especialidades = ref(Especialidad)
const medicos = ref(Medicos)

const deleteDialog = ref(false);
const itemToDelete = ref(null);
const cambiarRuta = ref(false);
const startTime = ref('08:00');
const endTime = ref('20:00');
const intervalMinutes = ref(30);



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


const editedItem = reactive({
    id: null,
    medico_id: '',
    especialidad_id: '',
    start_time: '',
    end_time: '',

});

const defaultItem = reactive({
   id: null,
    medico_id: '',
    especialidad_id: '',
    start_time: '',
    end_time: '',

});

const headers: any = reactive([
    { title: 'Especialidad', align: 'start', key: 'especialidad_name' },
    { title: 'Doctor Asignado', align: 'start', key: 'medico_name',value: (item: any) => `${item.patient_name} ${item.patient_lastname}` },
    { title: 'Fecha de entrada', align: 'start', key: 'date', value: (item: any) => formatearFecha(item.date) },
    { title: 'Fecha de salida', align: 'start', key: 'date', value: (item: any) => formatearFecha(item.date) },
    { title: 'intervalo', align: 'start', key: 'hour', value: (item: any) => formatearHoraMinutos(item.hour) },

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

function editItem(item: any) {
    editedIndex.value = store.citas.indexOf(item as (typeof store.citas)[0])
    Object.assign(editedItem, item);
    dialog.value = true;
}

function deleteItem(item: any) {
    itemToDelete.value = item;
    deleteDialog.value = true;
}

async function confirmDelete() {
    try {
        Object.assign(store.cita, itemToDelete.value);
        const response = store.delete();

        response.then(() => {
            store.fetchCitas();
            showAlert('success', 'Cita eliminada con éxito');
        }).catch(error => {
            showAlert('error', 'Error al eliminar la cita');
        });

    } catch (error) {
        showAlert('error', 'Error al eliminar la cita');
    } finally {
        deleteDialog.value = false;
        itemToDelete.value = null;
    }
}

function save() {
    Object.assign(store.cita, editedItem);
    let response;
    if (store.cita.id) {
        response = store.update();
        showAlert('success', 'Cita actualizada con éxito');
    } else {
        response = store.store();
        showAlert('success', 'Cita guardada con éxito');
    }

    response.then(() => {
        store.fetchCitas();
    }).catch(error => {
        showAlert(error, 'Error al guardar la cita');
    });

    Object.assign(editedItem, defaultItem);
    close();
}

/* function openDialog() {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
    dialog.value = true;
} */

function close() {
    dialog.value = false;
    setTimeout(() => {
        Object.assign(editedItem, defaultItem);
        editedIndex.value = -1;
    }, 300);
}

function refresh() {
    store.fetchCitas();
}

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nueva Cita' : 'Editar Cita';
});


//prueba de la funcion
console.log(formatearFecha('2023-10-01'));

const router = useRouter();

const nuevoPaciente = () => {
    router.push('/pacientes');
}



// Función para generar los intervalos de tiempo
// Definir la hora de inicio y fin para los intervalos de tiempo


// Función para generar los intervalos de tiempo
function generateTimeIntervals(start: string, end: string, interval: number) {
    const times = [];
    let current = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    while (current <= endTime) {
        const hours = current.getHours().toString().padStart(2, '0');
        const minutes = current.getMinutes().toString().padStart(2, '0');
        times.push(`${hours}:${minutes}`);
        current.setMinutes(current.getMinutes() + interval);
    }

    return times;
}




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
                ¿Estás seguro de que deseas eliminar esta cita?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
                <v-btn color="success" variant="text" @click="confirmDelete">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="cambiarRuta" persistent max-width="500">
        <v-card>
            <v-card-title class="headline">¿Estas seguro de salir?</v-card-title>
            <v-card-text>
                Si sales de esta pagina perderas los datos que no hayas guardado
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" variant="text" @click="cambiarRuta = false">Cancelar</v-btn>
                <v-btn color="success" variant="text" @click="nuevoPaciente">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Buscar" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-btn color="secondary" flat class="mr-1 ml-auto" @click="refresh">
                <v-icon class="mr-2">mdi-refresh</v-icon>
                Actualizar
            </v-btn>
            
           <ModalTiempo/>
            <v-dialog v-model="dialog" max-width="500" persistent>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="mr-1 ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Nueva Cita
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
                                       :items="especialidades"
                                       item-title="nombre"
                                       item-value="id"
                                        hide-details 
                                        v-model="editedItem.especialidad_id" 
                                        label="Especialidad"
                                        >
                                        
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                    <v-autocomplete
                                        variant="outlined" 
                                       :items="pacientes"
                                       item-title="nombre"
                                       item-value="id"
                                        hide-details 
                                        v-model="editedItem.medico_id" 
                                        label="Paciente">
                                    </v-autocomplete>
                                </v-col>
                          
                                <v-col cols="6">
                                    <v-autocomplete
                                        variant="outlined" 
                                        type="time"
                                        :items="medicos"
                                        item-title="nombre"
                                        item-value="id"
                                        hide-details 
                                        v-model="editedItem.start_time" 
                                        label="Hora de entrada">
                                    </v-autocomplete>
                                    
                                </v-col>
                                   
                                <v-col cols="6">
                                    <v-text-field
                                        type="time"
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.end_time"
                                        label="Hora de Salida"
                                    ></v-text-field>
                                </v-col>
                                 <!-- 
                                <v-col cols="6">
                                    <v-select
                                        :items="timeIntervals"
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.hour"
                                        label="Hora de la Cita"
                                    ></v-select>
                                </v-col> -->
                    
                    
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-btn v-if="editedItem.especialidad_id === ''" color="primary" @click="cambiarRuta = true">Registrar Nuevo Paciente</v-btn>
                        <v-spacer></v-spacer>
                       
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                        <v-btn color="secondary" :disabled="editedItem.especialidad_id == '' || editedItem.medico_id == '' " variant="flat" @click="save"
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
