<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useEmpresaStore } from '@/stores/apps/empresa/empresa';

// components
import ProfileBanner from '@/components/apps/empresa-profile/ProfileBanner.vue';
import IntroCard from '@/components/apps/empresa-profile/IntroCard.vue';
import PhotosCard from '@/components/apps/empresa-profile/PhotosCard.vue';
import PostListing from '@/components/apps/empresa-profile/PostListing.vue';
import AddPost from '@/components/apps/empresa-profile/posts/AddPost.vue';

const route = useRoute();
const store = useEmpresaStore();

onMounted(() => {
    Object.assign(store.empresa, { id: route.params.id });
    let response = store.show();
    response.then(() => {
        Object.assign(empresa.value, store.empresa);
    });
});

const getEmpresa = computed(() => {
    return store.empresa;
});

const empresa = ref(getEmpresa);

const page = ref({ title: 'Perfil de Empresa' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Perfil de Empresa',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <ProfileBanner :empresa="empresa" />
    <v-row class="mt-4">
        <v-col cols="12" lg="4" md="4">
            <IntroCard :empresa="empresa" />
            <PhotosCard />
        </v-col>
        <v-col cols="12" lg="8" md="8">
            <AddPost />
            <!-- <PostListing /> -->
        </v-col>
    </v-row>
</template>
