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

const getEmpresaPlaza: any = computed(() => {
    let response = [];

    for (var i in storeAccesoPlaza.empresas_plazas) {
        var compania = storeAccesoPlaza.empresas_plazas[i];
        response.push({
            id: compania.id,
            nombre: compania.company_name,
            nivel: 1,
            clase: `compania-${compania.id}`,
            main_class: `compania-${compania.id}`
        });

        for (var j in compania.empresas) {
            var empresa = compania.empresas[j];

            response.push({
                id: empresa.id,
                nombre: empresa.business_name,
                nivel: 2,
                clase: `compania-${compania.id} empresa-${empresa.id}`,
                main_class: `empresa-${empresa.id}`
            });

            for (var k in empresa.plazas) {
                var plaza = empresa.plazas[k];
                response.push({
                    id: plaza.id,
                    nombre: plaza.nombre,
                    nivel: 3,
                    clase: `compania-${compania.id} empresa-${empresa.id} plaza-${plaza.id} chk-acceso-plaza`
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
    let user_plazas = [];
    var _checked = e.target.checked;
    var inputElements = document.getElementsByClassName(row.main_class);

    for (var i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = _checked;
    }

    inputElements = document.getElementsByClassName('chk-acceso-plaza');

    for (var i = 0; i < inputElements.length; i++) {
        var _chekbox = inputElements[i] as HTMLInputElement;
        if (_chekbox.checked) user_plazas.push(_chekbox.getAttribute('dbid'));
    }

    storeAccesoPlaza.storeUserPlazas(store.user.id, user_plazas);
}

watch([() => store.user.id], () => {
    selected.value = [];
    var inputElements = document.getElementsByClassName('chk');

    for (var i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = false;
    }

    // storeAccesoPlaza.accessUserModules(store.user.id);
});

watch([() => storeAccesoPlaza.access_user_modules], () => {
    let tmp = storeAccesoPlaza.access_user_modules.map((item: any) => {
        return item.modulo_id;
    });

    var inputElements = document.getElementsByClassName('chk');

    for (var i = 0; i < inputElements.length; i++) {
        var _checkbox = inputElements[i] as HTMLInputElement;
        // storeAccesoPlaza.access_user_modules;
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
