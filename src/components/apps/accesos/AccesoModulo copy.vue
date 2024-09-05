<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/apps/user/user';
import { useModuloStore } from '@/stores/apps/sistema/modulo';

const store = useUserStore();
const authStore = useAuthStore();
const storeModulo = useModuloStore();

onMounted(() => {
    storeModulo.fetchAccesoModulos();
});

const getModulos: any = computed(() => {
    return storeModulo.modulos.map((item) => {
        return item;
    });
});

const props = defineProps({
    user: Object || Array
});

const selected = ref([]);

function handleClick(e: any, row: any) {
    let user_modules = [];
    const _checked = e.target.checked;

    // Selecciona/deselecciona los hijos
    let inputElements = document.getElementsByClassName(`class-${row.id}`);
    for (let i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = _checked;
    }

    // Selecciona el padre si se selecciona un hijo
    if (_checked) {
        selectParent(row);
    }

    inputElements = document.getElementsByClassName('chk-access-modules');
    for (let i = 0; i < inputElements.length; i++) {
        const _checkbox = inputElements[i] as HTMLInputElement;
        if (_checkbox.checked) user_modules.push(_checkbox.getAttribute('dbid'));
    }

    storeModulo.storeUserModules(store.user.id, user_modules);
}

// Función que selecciona el padre
function selectParent(row: any) {
    if (row.parent_id) {
        const parentElement = document.querySelector(`.chk-access-modules[dbid="${row.parent_id}"]`) as HTMLInputElement;
        if (parentElement) {
            parentElement.checked = true;
            // Llama a la función recursivamente para seleccionar los padres ascendentes
            const parentRow = storeModulo.modulos.find((modulo) => modulo.id === row.parent_id);
            if (parentRow) selectParent(parentRow);
        }
    }
}

watch([() => store.user.id], () => {
    selected.value = [];
    const inputElements = document.getElementsByClassName('chk-access-modules');

    for (let i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = false;
    }

    storeModulo.accessUserModules(store.user.id);
});

watch([() => storeModulo.access_user_modules], () => {
    const tmp = storeModulo.access_user_modules.map((item: any) => {
        return item.modulo_id;
    });

    const inputElements = document.getElementsByClassName('chk-access-modules');

    for (let i = 0; i < inputElements.length; i++) {
        const _checkbox = inputElements[i] as HTMLInputElement;
        for (const j in tmp) {
            if (tmp[j] == _checkbox.getAttribute('dbid')) _checkbox.checked = true;
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
