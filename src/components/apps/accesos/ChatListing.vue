<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/apps/user/user';
import { useModuloStore } from '@/stores/apps/sistema/modulo';
import { formatDistanceToNowStrict } from 'date-fns';
import { last } from 'lodash';

const store = useUserStore();
const storeModulo = useModuloStore();

onMounted(() => {
    store.fetchUsers();
});

const getUsers = computed(() => {
    return store.users;
});

const search = ref('');

const headers: any = ref([{ title: 'Nombre', align: 'start', key: 'name' }]);

const items = ref(getUsers);
function handleClick(event: any, row: any) {
    console.log('store.user: ', row);
    store.user = { ...row.item, thumb: './assets/images/profile/user-1.jpg' };
}
</script>
<template>
    <v-sheet>
        <div class="px-6 pt-3 pb-3">
            <v-text-field
                variant="outlined"
                v-model="search"
                append-inner-icon="mdi-magnify"
                placeholder="Buscar usuario"
                hide-details
            ></v-text-field>
        </div>
    </v-sheet>
    <perfect-scrollbar class="lgScroll pt-3">
        <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            class=""
            density="compact"
            :items-per-page="-1"
            @click:row="handleClick"
            :hover="true"
        >
            <template v-slot:bottom> </template>
        </v-data-table>
    </perfect-scrollbar>
</template>
<style>
.chatItem {
    padding: 16px 24px !important;
    border-bottom: 1px solid rgb(var(--v-theme-inputBorder), 0.1);
}
.badg-dot {
    position: relative;
    bottom: -10px;
}
.lgScroll {
    height: 500px;
}
</style>
