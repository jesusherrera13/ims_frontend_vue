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
        // console.log(item);
        return item;
    });
});

const props = defineProps({
    user: Object || Array
});

const selected = ref([]);

function handleClick(e: any, row: any) {
    let user_modules = [];
    var _checked = e.target.checked;
    var inputElements = document.getElementsByClassName(`class-${row.id}`);

    for (var i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = _checked;
    }

    inputElements = document.getElementsByClassName('chk-access-modules');

    for (var i = 0; i < inputElements.length; i++) {
        var _chekbox = inputElements[i] as HTMLInputElement;
        if (_chekbox.checked) user_modules.push(_chekbox.getAttribute('dbid'));
    }

    storeModulo.storeUserModules(store.user.id, user_modules);
}

watch([() => store.user.id], () => {
    selected.value = [];
    var inputElements = document.getElementsByClassName('chk-access-modules');

    for (var i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = false;
    }

    storeModulo.accessUserModules(store.user.id);
});

watch([() => storeModulo.access_user_modules], () => {
    let tmp = storeModulo.access_user_modules.map((item: any) => {
        return item.modulo_id;
    });

    var inputElements = document.getElementsByClassName('chk-access-modules');

    for (var i = 0; i < inputElements.length; i++) {
        var _checkbox = inputElements[i] as HTMLInputElement;
        // storeModulo.access_user_modules;
        for (var j in tmp) {
            console.log(tmp[j], _checkbox.getAttribute('dbid'));
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
                    <div v-for="item in getModulos" class="ma-1">
                        <input
                            type="checkbox"
                            :class="`chk-access-modules ${item.clase} nivel-${item.nivel}`"
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
