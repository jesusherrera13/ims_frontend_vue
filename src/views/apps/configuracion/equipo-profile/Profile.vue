<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useEquipoStore } from '@/stores/apps/equipo/equipo';

// components
import ProfileBanner from '@/components/apps/equipo-profile/ProfileBanner.vue';
import IntroCard from '@/components/apps/equipo-profile/IntroCard.vue';
import PhotosCard from '@/components/apps/equipo-profile/PhotosCard.vue';
import PostListing from '@/components/apps/equipo-profile/PostListing.vue';
import AddPost from '@/components/apps/equipo-profile/posts/AddPost.vue';

const route = useRoute();
const store = useEquipoStore();

onMounted(() => {
    Object.assign(store.equipo, { id: route.params.id, name: '', password: '' });
    let response = store.show();
    response.then(() => {
        Object.assign(equipo.value, store.equipo);
    });
});

const getEquipo = computed(() => {
    return store.equipo;
});

const equipo = ref(getEquipo);

const page = ref({ title: 'Perfil de Equipo' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Perfil de Equipo',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <ProfileBanner :equipo="equipo" />
    <v-row class="mt-4">
        <v-col cols="12" lg="4" md="4">
            <IntroCard :equipo="equipo" />
            <PhotosCard />
        </v-col>
        <v-col cols="12" lg="8" md="8">
            <AddPost />
            <!-- <PostListing /> -->
        </v-col>
    </v-row>
</template>
