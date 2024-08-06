<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useEmpleadoStore } from '@/stores/apps/empleado/empleado';

// components
import ProfileBanner from '@/components/apps/empleado-profile/ProfileBanner.vue';
import IntroCard from '@/components/apps/empleado-profile/IntroCard.vue';
import PhotosCard from '@/components/apps/empleado-profile/PhotosCard.vue';
import PostListing from '@/components/apps/empleado-profile/PostListing.vue';
import AddPost from '@/components/apps/empleado-profile/posts/AddPost.vue';

const route = useRoute();
const store = useEmpleadoStore();

onMounted(() => {
    Object.assign(store.empleado, { id: route.params.id, name: '', password: '' });
    let response = store.show();
    response.then(() => {
        Object.assign(empleado.value, store.empleado);
    });
});

const getEmpleado = computed(() => {
    return store.empleado;
});

const empleado = ref(getEmpleado);

const page = ref({ title: 'Perfil de Usuario' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Perfil de Usuario',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <ProfileBanner :empleado="empleado" />
    <v-row class="mt-4">
        <v-col cols="12" lg="4" md="4">
            <IntroCard :empleado="empleado" />
            <PhotosCard />
        </v-col>
        <v-col cols="12" lg="8" md="8">
            <AddPost />
            <!-- <PostListing /> -->
        </v-col>
    </v-row>
</template>
