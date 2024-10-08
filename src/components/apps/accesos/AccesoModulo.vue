<script setup lang="ts">
import { ref, onMounted, computed, watch, toRaw, defineProps } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/apps/user/user';
import { useModuloStore } from '@/stores/apps/sistema/modulo';
import { useAccesoStore } from '@/stores/apps/acceso/acceso';

const store = useUserStore();
const authStore = useAuthStore();
const storeModulo = useModuloStore();
const accesoStore = useAccesoStore();

onMounted(() => {
    storeModulo.fetchAccesoModulos();
});

const getModulos: any = computed(() => {
    return storeModulo.modulos.map((item) => item); // itera sobre los módulos y los retorna en un array nuevo para que se actualice la vista al cambiar el valor
});

const props = defineProps({
    user: Object || Array
});

const selected = ref([]); // se usa para limpiar los checkboxes al cambiar de usuario en el watch de user.id

function handleClick(e: any, row: any) {
    // row es el módulo seleccionado y e es el evento
    try {
        console.log('Módulo seleccionado:', row);
        let user_modules = []; // Array que almacena los módulos seleccionados por el usuario
        const _checked = e.target.checked; // Obtiene el estado del checkbox el checked.checkbox sirve para saber si el checkbox está seleccionado o no

        // Selecciona/deselecciona los hijos
        let inputElements = document.getElementsByClassName(`class-${row.id}`);
        for (let i = 0; i < inputElements.length; i++) {
            (inputElements[i] as HTMLInputElement).checked = _checked; // htmlinputelement es un tipo de dato que se utiliza para los elementos de tipo input en html y se castea a HTMLInputElement para poder acceder a sus propiedades y métodos como checked que sirve para saber si el checkbox está seleccionado o no
        }

        // Selecciona el padre si se selecciona un hijo
        if (_checked) {
            selectParent(row);
        } else {
            deselectChild(row); // Si se deselecciona, deseleccionar todos los hijos
        }

        inputElements = document.getElementsByClassName('chk-access-modules');
        for (let i = 0; i < inputElements.length; i++) {
            const _checkbox = inputElements[i] as HTMLInputElement;
            if (_checkbox.checked) user_modules.push(_checkbox.getAttribute('dbid'));
            // Si el checkbox está seleccionado, se agrega el id del módulo al array user_modules
            console.log('dbid:', _checkbox.getAttribute('dbid'));
        }
        // Almacena los módulos seleccionados por el usuario en la base de datos y en el store de Vuex
        storeModulo.storeUserModules(store.user.id, user_modules);
        storeModulo.fetchAccesoModulos(); // Almacena los módulos seleccionados por el usuario
        storeModulo.accessUserModules(store.user.id); // Obtiene los módulos seleccionados por el usuario

        console.log('Módulos seleccionados:', user_modules);
    } catch (error) {
        console.error('Error en handleClick:', error);
    }
}

// Función que selecciona todos los padres ascendentes
function selectParent(row: any) {
    if (row.parent_id) {
        const parentElement = document.querySelector(`.chk-access-modules[dbid="${row.parent_id}"]`) as HTMLInputElement; // Busca el elemento padre
        if (parentElement) {
            console.log('store modulos', storeModulo); // Verifica si 'storeModulo' está definido
            console.log('modulos', storeModulo.modulos); // Verifica si 'modulos' es un array

            parentElement.checked = true;
            // Llama a la función recursivamente para seleccionar los padres ascendentes
            const parentRow = storeModulo.modulos.find((modulo: any) => modulo.id === row.parent_id); // Busca el módulo padre en el array de módulos
            if (parentRow) selectParent(parentRow); // Si existe el módulo padre, se llama a la función selectParent con el módulo padre como argumento
        }
    }
}

// Función que deselecciona todos los hijos descendentes
function deselectChild(row: any) {
    const childElements = document.getElementsByClassName(`class-${row.id}`);
    console.log('Deseleccionando hijos:', childElements);
    for (let i = 0; i < childElements.length; i++) {
        (childElements[i] as HTMLInputElement).checked = false; // Deselecciona los hijos del módulo seleccionado
    }
}

watch([() => store.user.id], (newValue, oldValue) => {
    console.log('Watcher store.user.id activado');
    console.log('Nuevo valor:', newValue);
    console.log('Valor anterior:', oldValue);

    selected.value = [];
    const inputElements = document.getElementsByClassName('chk-access-modules');

    for (let i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = false;
    }

    /*  // Verifica que se está llamando correctamente el método
    storeModulo.accessUserModules(store.user.id).then(() => {
        console.log('Módulos de usuario obtenidos correctamente');
    }).catch((error) => {
        console.error('Error al obtener los módulos:', error);
    }); */
});

watch([() => storeModulo.access_user_modules], () => {
    const rawAccessModules = toRaw(storeModulo.access_user_modules); // Convierte el proxy en un array normal
    console.log('Contenido real de access_user_modules:', rawAccessModules); // Aquí se puede ver el contenido real del array de módulos seleccionados por el usuario

    const tmp = rawAccessModules.map((item: any) => item.modulo_id);

    const inputElements = document.getElementsByClassName('chk-access-modules');

    for (let i = 0; i < inputElements.length; i++) {
        const _checkbox = inputElements[i] as HTMLInputElement;
        for (const id of tmp) {
            if (id == _checkbox.getAttribute('dbid')) _checkbox.checked = true;
        }
    }
});
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card variant="outlined" class="bg-surface">
                <v-card-item>
                    <h4 class="text-h4">Módulo de acceso</h4>
                    <div v-for="item in getModulos" :key="item.id" class="ma-1">
                        <input
                            type="checkbox"
                            :class="`chk-access-modules class-${item.id} ${item.clase} nivel-${item.nivel}`"
                            @change="handleClick($event, item)"
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
