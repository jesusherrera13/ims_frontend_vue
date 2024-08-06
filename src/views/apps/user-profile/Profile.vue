<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useUserStore } from '@/stores/apps/user/user';

// components
import ProfileBanner from '@/components/apps/user-profile/ProfileBanner.vue';
import IntroCard from '@/components/apps/user-profile/IntroCard.vue';
import PhotosCard from '@/components/apps/user-profile/PhotosCard.vue';
import PostListing from '@/components/apps/user-profile/PostListing.vue';
import AddPost from '@/components/apps/user-profile/posts/AddPost.vue';

const route = useRoute();
const store = useUserStore();

onMounted(() => {
    Object.assign(store.user, { id: route.params.id, name: '', password: '' });
    let response = store.show();
    response.then(() => {
        Object.assign(user.value, store.user);
    });
});

const getUser = computed(() => {
    return store.user;
});

const user = ref(getUser);

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
    <ProfileBanner :user="user" />
    <v-row class="mt-4">
        <v-col cols="12" lg="4" md="4">
            <IntroCard :user="user" />
            <PhotosCard />
        </v-col>
        <v-col cols="12" lg="8" md="8">
            <AddPost />
            <!-- <PostListing /> -->
        </v-col>
    </v-row>
</template>
