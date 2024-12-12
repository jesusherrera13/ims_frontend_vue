<script setup lang="ts">
import { ref, computed } from 'vue';
import { HeartIcon, PhoneIcon, UserIcon } from 'vue-tabler-icons';
import { useAuthMenuStore } from '@/stores/authMenu';
// import User from './apps/user/User.vue';
// import Rol from './apps/user/Rol.vue';
import User from '@/views/apps/user/User.vue';
import Rol from '@/views/apps/user/Rol.vue';
import Paciente from '@/views/apps/paciente/Paciente.vue';
import Regimen from '@/views/apps/user/Regimen.vue';
import Perfiles from '@/views/apps/perfiles/Perfiles.vue';
import Medico from '@/views/apps/medico/Medico.vue';
import Receta from '@/views/apps/receta/Receta.vue';
import Cita from '@/views/apps/cita/Cita.vue';
import MetodoPago from '@/views/apps/metodo-pago/Metodo-pago.vue';
import Empresa from '@/views/apps/empresa/Empresa.vue';
import Plaza from '@/views/apps/plaza/Plaza.vue';
import Departamento from '@/views/apps/departamento/Departamento.vue';

const authMenuStore = useAuthMenuStore();

const tab = ref(null);
const tabHide = (tab: any) => {
    let item = tabs.value.filter((t) => {
        console.log(t.name, tab.name);
        if (t.name == tab.name) {
            t.visible = false;
            console.log(t);
        }
    });
};

const items = ref([
    {
        name: 'usuarios',
        title: 'Usuarios',
        value: 1
    },
    {
        name: 'responsables',
        title: 'Responsables',
        value: 2
    },
    {
        name: 'productos',
        title: 'Productos',
        value: 3
    },
]);

const tabs = ref([
    { name: 'usuarios', title: 'Usuarios', visible: true, icon: 'mdi-phone' },
    {
        name: 'responsables',
        title: 'Responsables',
        visible: false,
        icon: 'mdi-phone'
    },
    {
        name: 'productos',
        title: 'Productos',
        visible: false,
        icon: 'mdi-phone'
    },
    {
        name: 'rol',
        title: 'Roles',
        visible: false,
        icon: 'mdi-phone'
    },
    {
        name: 'regimen',
        title: 'Régimen',
        visible: false,
        icon: 'mdi-phone'
    },
    {
        name: 'perfiles',
        title: 'Perfiles',
        visible: false,
        icon: 'mdi-phone'
    },
    {
        name: 'medicos',
        title: 'Médicos',
        visible: false,
        icon: 'mdi-card-account-details'
    },
    {
        name: 'recetas',
        title: 'Recetas',
        visible: false,
        icon: 'mdi-card-account-details'
    },
    {
        name: 'citas',
        title: 'Citas',
        visible: false,
        icon: 'mdi-card-account-details'
    },
    {
        name: 'metodo-pago',
        title: 'Metodos de pago',
        visible: false,
        icon: 'mdi-card-account-details'
    },
    {
        name: 'empresas',
        title: 'Empresas',
        visible: false,
        icon: 'mdi-card-account-details'
    },
    {
        name: 'plazas',
        title: 'Plazas',
        visible: false,
        icon: 'mdi-card-account-details'
    },
    {
        name: 'departamentos',
        title: 'Departamentos',
        visible: false,
        icon: 'mdi-card-account-details'
    },
]);

const getItems: any = computed(() => {
    var m: any = [];
    authMenuStore.items.map((item: any) => {
        if (item.children) {
            item.children.map((c: any) => {
                m.push(c);
            });
        } else {
            m.push(item);
        }
    });

    return m;
});

const toggle = (item: any) => {
    item.visible = false;
    console.log(item);
};
</script>

<template>
    <v-card elevation="0">
        <v-tabs v-model="tab" bg-color="primary" centered stacked>
            <v-tab value="1">
                <div>
                    <div>
                        <PhoneIcon stroke-width="1.5" width="20" />
                        Recents
                    </div>
                </div>
            </v-tab>

            <template v-for="tab in getItems" :key="tab.key">
                <v-tab :value="tab.key" v-if="tab.visible">
                    <div>
                        <div class="d-flex justify-end">
                            <v-icon icon="mdi-close" @click="toggle(tab)"></v-icon>
                        </div>
                        <div>
                            <PhoneIcon stroke-width="1.5" width="20" />
                            {{ tab.title }}
                        </div>
                    </div>
                </v-tab>
            </template>
            <v-tab value="2">
                <HeartIcon stroke-width="1.5" width="20" />
                Favorites
            </v-tab>
            <v-tab value="3">
                <UserIcon stroke-width="1.5" width="20" />
                Nearby
            </v-tab>
        </v-tabs>
        <v-card-text class="bg-grey100 rounded-md mt-4">
            <v-window v-model="tab">
                <v-window-item value="1"> Item One </v-window-item>
                <v-window-item value="2"> Item two </v-window-item>
                <v-window-item value="3"> Item three </v-window-item>
                <v-window-item value="usuarios">
                    <User />
                </v-window-item>
                <v-window-item value="rol">
                    <Rol />
                </v-window-item>
                <v-window-item value="paciente">
                    <Paciente />
                </v-window-item>
                <v-window-item value="regimen">
                    <Regimen />
                </v-window-item>
                <v-window-item value="perfiles">
                    <Perfiles />
                </v-window-item>
                <v-window-item value="medicos">
                    <Medico />
                </v-window-item>
                <v-window-item value="recetas">
                    <Receta />
                </v-window-item>
                <v-window-item value="citas">
                    <Cita />
                </v-window-item>
                <v-window-item value="metodo-pago">
                    <MetodoPago />
                </v-window-item>
                <v-window-item value="empresas">
                    <Empresa />
                </v-window-item>
                <v-window-item value="plazas">
                    <Plaza />
                </v-window-item>
                <v-window-item value="departamentos">
                    <Departamento />
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>
<style>
.mdi-close {
    font-size: 12px !important;
}
</style>
