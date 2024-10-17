<script setup>

import { ref, computed, onMounted, watch, reactive } from 'vue';

const horario= reactive ({
    startTime: '08:00',
    endTime: '18:00',
    interval: 30,
})


const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Establecer Horario e intervalos' : 'Editar Horario e intervalos';
});
</script>


<template>


<v-dialog v-model="dialog" max-width="500" persistent>
                <template v-slot:activator="{ tiempo }">
                    <v-btn color="error" flat class="mr-1 ml-auto">
                        <v-icon class="mr-2" v-bind="tiempo" >mdi-timer-sand</v-icon>Horarios de Atencion
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="6">
                                    <v-select
                                        :items="timeIntervals"
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.hour"
                                        label="Hora de la Cita"
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                        :items="timeIntervals"
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.hour"
                                        label="Hora de la Cita"
                                    ></v-select>
                                </v-col>
                    
                    
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-btn v-if="editedItem.patient_id === ''" color="primary" @click="cambiarRuta = true">Registrar Nuevo Paciente</v-btn>
                        <v-spacer></v-spacer>
                       
                        <v-btn color="error" @click="close">Cancelar</v-btn>
                        <v-btn color="secondary" :disabled="editedItem.patient_id == '' || editedItem.medico_id == '' " variant="flat" @click="save"
                            >Guardar</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
</template>



<style lang="scss" scoped>

</style>