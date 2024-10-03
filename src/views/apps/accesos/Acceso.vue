<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import AccesoModulo from '@/components/apps/accesos/AccesoModulo.vue';
import AccesoPlaza from '@/components/apps/accesos/AccesoPlaza.vue';

import { useUserStore } from '@/stores/apps/user/user';
import { useRolStore } from '@/stores/apps/rol';
import { useAccesoStore } from '@/stores/apps/acceso/acceso';
// theme breadcrumb

const userStore = useUserStore();
const rolStore = useRolStore();
const accesoStore = useAccesoStore();
const selected_user = ref({});

onMounted(() => {
    userStore.fetchUsers();
});

const editedItem = ref();

const getUsers: any = computed(() => {
    return userStore.users.map((item: any) => {
        var email_verified_at = item.email_verified_at;
        return { ...item, email_verified_at: email_verified_at ? email_verified_at.substring(0, 10) : null };
    });
});

const page = ref({ title: 'Accesos' });

const breadcrumbs = ref([
    {
        text: 'Accesos',
        disabled: true,
        href: '#'
    }
]);

const users = ref(getUsers);

function onLanguageChange() {
    console.log('xxx');
}

watch(editedItem, (newValue) => {
    accesoStore.user = newValue;

    let inputElements = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < inputElements.length; i++) {
        var chk = inputElements[i] as HTMLInputElement;
        chk.checked = false;
    }

    userStore.userModules(newValue.id).then(() => {
        for (var i = 0; i < inputElements.length; i++) {
            var chk = inputElements[i] as HTMLInputElement;

            userStore.user_modulos.map((item: any) => {
                if (item.id == chk.getAttribute('dbid') && item.nombre == chk.getAttribute('nombre')) chk.checked = true;
            });
        }
    });
});
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <!-- <UserEditableTable /> -->
            <v-row>
                <v-col cols="12" lg="8" md="6" class="text-right">
                    <v-select
                        variant="outlined"
                        hide-details
                        :items="users"
                        item-title="name"
                        item-value="id"
                        v-model="editedItem"
                        label="Usuario"
                        return-object
                    ></v-select>
                    <v-btn color="secondary" flat class="mr-1">
                        <v-icon class="mr-2">mdi-refresh</v-icon>
                        Actualizar
                    </v-btn>
                </v-col>
            </v-row>
            <AccesoModulo />
            <AccesoPlaza />
        </v-card-text>
    </v-card>
</template>
