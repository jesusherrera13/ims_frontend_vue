<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/apps/user/user';
import { useAccesoPlazaStore } from '@/stores/apps/sistema/plaza';

const store = useUserStore();
const authStore = useAuthStore();
const storeAccesoPlaza = useAccesoPlazaStore();

onMounted(() => {
    storeAccesoPlaza.fetchAccesoPlazas();
});

const getEmpresaPlaza: any = computed(() => { // se obtienen las empresas y plazas
    let response = []; // se crea un arreglo para almacenar las empresas y plazas

    for (var i in storeAccesoPlaza.empresas_plazas) { // se recorre el arreglo de empresas y plazas
        var compania = storeAccesoPlaza.empresas_plazas[i]; // se asigna la empresa 
        response.push({ // se agrega la empresa al arreglo
            id: compania.id, // se asigna el id de la empresa
            nombre: compania.company_name, // se asigna el nombre de la empresa
            nivel: 1, // se asigna el nivel de la empresa
            clase: `compania-${compania.id}`, // se asigna la clase de la empresa
            main_class: `compania-${compania.id}` // se asigna la clase principal de la empresa
        });

        for (var j in compania.empresas) { // se recorre el arreglo de empresas
            var empresa = compania.empresas[j]; // se asigna la empresa

            response.push({  // se agrega la empresa al arreglo 
                id: empresa.id,     // se asigna el id de la empresa
                nombre: empresa.business_name, // se asigna el nombre de la empresa
                nivel: 2, // se asigna el nivel de la empresa
                clase: `compania-${compania.id} empresa-${empresa.id}`, // se asigna la clase de la empresa
                main_class: `empresa-${empresa.id}` // se asigna la clase principal de la empresa 
            });

            for (var k in empresa.plazas) { // se recorre el arreglo de plazas 
                var plaza = empresa.plazas[k]; // se asigna la plaza 
                response.push({ // se agrega la plaza al arreglo  
                    id: plaza.id, // se asigna el id de la plaza
                    nombre: plaza.nombre,  // se asigna el nombre de la plaza 
                    nivel: 3, // se asigna el nivel de la plaza
                    clase: `compania-${compania.id} empresa-${empresa.id} plaza-${plaza.id} chk-acceso-plaza` // se asigna la clase de la plaza
                });
            }
        }
    }

    return response;
});

const props = defineProps({
    user: Object || Array
});

const selected = ref([]);

function handleClick(e: any, row: any) {
    let user_plazas = []; // se crea un arreglo para almacenar las plazas seleccionadas
    var _checked = e.target.checked; // se obtiene el valor del checkbox seleccionado
    var inputElements = document.getElementsByClassName(row.main_class);  // esto significa que se selecciona todo el grupo de elementos

    for (var i = 0; i < inputElements.length; i++) { // se recorre el grupo de elementos y se les asigna el valor del checkbox
        (inputElements[i] as HTMLInputElement).checked = _checked; // se asigna el valor del checkbox
    }

    inputElements = document.getElementsByClassName('chk-acceso-plaza'); // se seleccionan todos los elementos con la clase chk-acceso-plaza

    for (var i = 0; i < inputElements.length; i++) { // se recorre el grupo de elementos
        var _chekbox = inputElements[i] as HTMLInputElement; // se asigna el valor del checkbox
        if (_chekbox.checked) user_plazas.push(_chekbox.getAttribute('dbid')); // si el checkbox esta seleccionado se agrega al arreglo
    }

    storeAccesoPlaza.storeUserPlazas(store.user.id, user_plazas); // se almacenan las plazas seleccionadas
}

watch([() => store.user.id], () => { // se observa el cambio del usuario
    selected.value = []; // se limpia el arreglo de plazas seleccionadas
    var inputElements = document.getElementsByClassName('chk'); // se seleccionan todos los elementos con la clase chk

    for (var i = 0; i < inputElements.length; i++) { // se recorre el  grupo de elementos
        (inputElements[i] as HTMLInputElement).checked = false; // se deseleccionan los checkbox
    }

    // storeAccesoPlaza.accessUserModules(store.user.id); // se obtienen los modulos del usuario
});

watch([() => storeAccesoPlaza.access_user_modules], () => { // se observa el cambio de los modulos del usuario
    let tmp = storeAccesoPlaza.access_user_modules.map((item: any) => { // se obtienen los modulos del usuario
        return item.modulo_id; // se retorna el id del modulo
    });

    var inputElements = document.getElementsByClassName('chk'); // se seleccionan todos los elementos con la clase chk

    for (var i = 0; i < inputElements.length; i++) { // se recorre el grupo de elementos
        var _checkbox = inputElements[i] as HTMLInputElement; // se asigna el valor del checkbox
        // storeAccesoPlaza.access_user_modules;
        for (var j in tmp) { // se recorre el arreglo de modulos
            console.log(tmp[j], _checkbox.getAttribute('dbid')); // se imprime en consola el id del modulo y el id del checkbox
            if (tmp[j] == _checkbox.getAttribute('dbid')) _checkbox.checked = true; // si el id del modulo es igual al id del checkbox se selecciona el checkbox
        }
    }
});
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-card variant="outlined" class="bg-surface">
                <v-card-item>
                    <h4 class="text-h4">Plazas</h4>
                    <div v-for="item in getEmpresaPlaza" class="ma-1">
                        <input
                            type="checkbox"
                            :class="`chk ${item.clase} nivel-${item.nivel}`"
                            @click="handleClick($event, item)"
                            :dbid="item.id"
                        />
                        <span :class="`module-span-${item.nivel}`">
                            {{ item.nombre }}
                        </span>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
<style scoped>
input[type='checkbox'] {
    margin-right: 5px;
}
.module-span-1 {
    font-weight: 600;
}
.nivel-2 {
    margin-left: 30px;
}
.nivel-3 {
    margin-left: 60px;
}
</style>
