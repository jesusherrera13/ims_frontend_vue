<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import type { DirectiveBinding } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/apps/user/user';
import { useModuloStore } from '@/stores/apps/sistema/modulo';

// Tiendas (Stores)
const store = useUserStore();
const authStore = useAuthStore();
const storeModulo = useModuloStore();

onMounted(() => {
    storeModulo.fetchAccesoModulos();
});

const getModulos: any = computed(() => {
    return storeModulo.modulos.map((item) => item);
});

const props = defineProps({
    user: Object || Array
});

const selected = ref([]); 

// Función que maneja la selección y deselección de los checkboxes
function handleClick(e: any, row: any) {
    const _checked = e.target.checked;

    // Seleccionar padres si está marcado
    if (_checked) {
        selectParent(row);
    }

    updateUserModules(); // Actualiza los módulos seleccionados en el store
}

// Función para seleccionar todos los padres ascendentes
function selectParent(row: any) {
    if (row.parent_id) {
        const parentElement = document.querySelector(`.chk-access-modules[dbid="${row.parent_id}"]`) as HTMLInputElement; // Busca el elemento padre
        if (parentElement && !parentElement.checked) { // Si el padre existe y no está seleccionado lo selecciona 
            parentElement.checked = true;
            const parentRow = storeModulo.modulos.find((modulo: any) => modulo.id === row.parent_id);
            if (parentRow) selectParent(parentRow); // Llama recursivamente para seleccionar todos los padres
        }
    }
}

function updateUserModules() {
    let user_modules: string[] = []; // Array para almacenar los módulos seleccionados
    const inputElements = document.getElementsByClassName('chk-access-modules');

    for (let i = 0; i < inputElements.length; i++) {
        const _checkbox = inputElements[i] as HTMLInputElement;
        if (_checkbox.checked) {
            user_modules.push(_checkbox.getAttribute('dbid') as string); // Agrega el id del módulo al array si está seleccionado
        }
    }

    // Actualizar los módulos seleccionados en el store
    storeModulo.storeUserModules(store.user.id, user_modules);
}

watch([() => store.user.id], () => {
    selected.value = [];
    const inputElements = document.getElementsByClassName('chk-access-modules');

    for (let i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = false;
    }

    storeModulo.accessUserModules(store.user.id);
});

watch([() => storeModulo.access_user_modules], () => { // Cargar los módulos seleccionados por el usuario
    const tmp = storeModulo.access_user_modules.map((item: any) => item.modulo_id); // Array con los módulos seleccionados
    const inputElements = document.getElementsByClassName('chk-access-modules'); // Todos los checkboxes

    for (let i = 0; i < inputElements.length; i++) { // Recorrer los checkboxes
        const _checkbox = inputElements[i] as HTMLInputElement; // Checkbox actual
        for (const j in tmp) { // Recorrer los módulos seleccionados
            if (tmp[j] == _checkbox.getAttribute('dbid')) _checkbox.checked = true; // Marcar el checkbox si está en los módulos seleccionados
        }
    }
});

// Directiva para manejar la lógica de los checkboxes
const vCheckboxTree = {
    mounted(el: HTMLInputElement, binding: DirectiveBinding) {
        const { row, handleClick } = binding.value;

        // Escucha los cambios en el checkbox y propaga la selección hacia arriba y hacia abajo
        el.addEventListener('change', (event: Event) => {
            const checked = (event.target as HTMLInputElement).checked;

            // Seleccionar o deseleccionar los hijos
            const childCheckboxes = document.querySelectorAll(`.class-${row.id}`);
            childCheckboxes.forEach((child: Element) => {
                (child as HTMLInputElement).checked = checked;
            });

            // Propagar el evento hacia los padres
            handleClick(event, row);

            // Forzar actualización del DOM para que Vue aplique los cambios
            binding.instance?.$forceUpdate();
        });
    }
};
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
                            v-checkbox-tree="{ row: item, modulos: getModulos, handleClick }"
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
