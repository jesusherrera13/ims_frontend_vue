<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
//import { useReligionStore } from '@/stores/apps/religiones/religion';
import { useMedicoStore } from '@/stores/apps/medicos/medico';
import { useEspecialidadStore } from '@/stores/apps/especialidades/especialidad';
import { formatearFecha,formatearHoraMinutos } from '@/helpers/helpers';
//import ModalTiempo from '@/components/table/cita/ModalTiempo.vue';
import { useHorarioStore } from '@/stores/apps/horario/horario';

import { PencilIcon, TrashIcon ,TimelineEventIcon } from 'vue-tabler-icons';
/* import { start } from 'repl'; */
/* import { type } from '../../../types/components/datatables/index';
 */

const store = useHorarioStore();
//const ReligionStore = useReligionStore();
const MedicoStore = useMedicoStore();
const EspecialidadStore = useEspecialidadStore();


type AlertType = 'success' | 'error' | 'info' | 'warning' | undefined;

onMounted(async () => {
    store.fetchHorario();
    MedicoStore.fetchMedicos();
    EspecialidadStore.fetchEspecialidades();


    //ReligionStore.fetchReligiones();
});

const getHorarios: any = computed(() => {
    return store.horarios;
});

// Propiedad computada para los intervalos de tiempo
const timeIntervals = computed(() => {
    return generateTimeIntervals(editedItem.start_time,editedItem.end_time, intervalMinutes.value);
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

/* const Paciente: any = computed(() => {
    return store.pacientes.sort((a: any, b: any) => {
        const nameA = `${a.nombre} ${a.apellido1}`.toUpperCase(); // ignore upper and lowercase
        const nameB = `${b.nombre} ${b.apellido1}`.toUpperCase();
         // ignore upper and lowercase

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
    });
}); */

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
const items = ref(getHorarios);


const especialidades = ref(Especialidad)
const medicos = ref(Medicos)

const deleteDialog = ref(false);
const itemToDelete = ref(null);
const cambiarRuta = ref(false);
/* const startTime = ref('08:00');
const endTime = ref('20:00'); */
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
    hour: '',
});

const defaultItem = reactive({
    id: null,
    medico_id: '',
    especialidad_id: '',
    start_time: '',
    end_time: '',
    hour: '',
});

const headers: any = reactive([
    { title: 'Especialidad', align: 'start', key: 'especialidad_name' },
    { title: 'Doctor Asignado', align: 'start', key: 'medico_name' },
    { title: 'Fecha', align: 'start', key: 'date', value: (item: any) => formatearFecha(item.date) },
    { title: 'Hora de inicio', align: 'start', key: 'start_time', value: (item: any) => formatearHoraMinutos(item.start_time) },
    { title: 'Hora de fin', align: 'start', key: 'end_time', value: (item: any) => formatearHoraMinutos(item.end_time) },

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
    editedIndex.value = store.horarios.indexOf(item as (typeof store.horarios)[0])
    Object.assign(editedItem, item);
    dialog.value = true;
}

function deleteItem(item: any) {
    itemToDelete.value = item;
    deleteDialog.value = true;
}

async function confirmDelete() {
    try {
        Object.assign(store.horario, itemToDelete.value);
        const response = store.delete();

        response.then(() => {
            store.fetchHorario();
            showAlert('success', 'Horario eliminad con éxito');
        }).catch(error => {
            showAlert('error', 'Error al eliminar el Horario');
        });

    } catch (error) {
        showAlert('error', 'Error al eliminar el Horario');
    } finally {
        deleteDialog.value = false;
        itemToDelete.value = null;
    }
}

function save() {
    Object.assign(store.horario, editedItem);
    let response;
    if (store.horario.id) {
        response = store.update();
        showAlert('success', 'Horario actualizad con éxito');
    } else {
        response = store.store();
        showAlert('success', 'Horario guardado con éxito');
    }

    response.then(() => {
        store.fetchHorario();
    }).catch(error => {
        showAlert(error, 'Error al guardar el Horario');
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
    store.fetchHorario();
}

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nuevo Horario' : 'Editar Horario';
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
                ¿Estás seguro de que deseas eliminar este Horario?
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
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Nuevo Horario
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
                        <!--      <v-col cols="12">
                                    <v-autocomplete
                                        variant="outlined" 
                                    :items="pacientes"
                                    item-title="nombre"
                                    item-value="id"
                                        hide-details 
                                        v-model="editedItem.patient_id" 
                                        label="Paciente">
                                    </v-autocomplete>
                                </v-col> -->
                            
                                <v-col cols="12">
                                    <v-autocomplete
                                        variant="outlined" 
                                        :items="medicos"
                                        item-title="nombre"
                                        item-value="id"
                                        hide-details 
                                        v-model="editedItem.medico_id" 
                                        label="Doctor que se le asignara la consulta">
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        type="time"
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.start_time"
                                        label="Hora que empieza el turno"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        type="time"
                                        :items="timeIntervals"
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.end_time"
                                        label="Hora que termina el turno"
                                    ></v-text-field>
                                </v-col>
                    
                    
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
                               <v-list-item value="intervalo" prepend-icon="mdi-time" @click="deleteItem(item)">
                                <v-list-item-title>Editar intervalo de tiempo</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
    <v-overlay v-model="store.is_loading"></v-overlay>
</template>
