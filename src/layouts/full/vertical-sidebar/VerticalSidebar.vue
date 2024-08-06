<script setup lang="ts">
import { ref, shallowRef, onMounted, computed } from 'vue';

import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';

import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/Logo.vue';
import { useAuthStore } from '@/stores/auth';
import { MenuIcon, BrandChromeIcon } from 'vue-tabler-icons';

const customizer = useCustomizerStore();
const authStore = useAuthStore();

onMounted(() => {
    // authStore.userModules(authStore.user.id);
    console.log(9);
    authStore.authSideBar(authStore.user.id);
});

const getSideBarMenu: any = computed(() => {
    /* let side_bar = [];

    for (var i in authStore.system_modules) {
        side_bar.push({ header: authStore.system_modules[i].nombre });

        if (authStore.system_modules[i].items.length) {
            for (var j in authStore.system_modules[i].items) {
                if (authStore.system_modules[i].items[j].items && authStore.system_modules[i].items[j].items.length) {
                    var menu = { title: authStore.system_modules[i].items[j].nombre, icon: MenuIcon, to: '#', children: [] };
                    for (var k in authStore.system_modules[i].items[j].items) {
                        menu.children.push({
                            title: authStore.system_modules[i].items[j].items[k].nombre,
                            icon: BrandChromeIcon,
                            to: authStore.system_modules[i].items[j].items[k].route
                        });
                    }
                    side_bar.push(menu);
                } else {
                    // console.log('x:', authStore.system_modules[i].items[j].route);
                    if (typeof authStore.system_modules[i].items[j] !== 'never') {
                        side_bar.push({
                            title: authStore.system_modules[i].items[j].nombre,
                            icon: BrandChromeIcon,
                            to: authStore.system_modules[i].items[j].route
                        });
                    }
                }
            }
        }
    }

    return side_bar; */
});

const getAuthSideBar: any = computed(() => {
    return authStore.auth_sidebar.map((item: any) => {
        var menu = { ...item };

        if (menu.parent_id) {
            if (menu.children) menu.icon = MenuIcon;
            else menu.icon = BrandChromeIcon;
        } else {
        }

        return menu;
        // return {...item, icon:}
    });

    // return authStore.auth_sidebar;
});

const sidebarMenu = ref(getSideBarMenu);
</script>

<template>
    <v-navigation-drawer
        left
        v-model="customizer.Sidebar_drawer"
        elevation="0"
        rail-width="75"
        app
        class="leftSidebar"
        :rail="customizer.mini_sidebar"
        expand-on-hover
        width="256"
    >
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <div class="profile">
                <div class="profile-pic profile-pic py-7 px-3">
                    <v-avatar size="45">
                        <img src="@/assets/images/profile/user2.jpg" width="50" alt="Julia" />
                    </v-avatar>
                </div>
                <div class="profile-name d-flex align-center px-3">
                    <h5 class="text-white font-weight-medium">{{ authStore.user.name }}</h5>
                    <div class="ml-auto profile-logout">
                        <v-btn variant="text" icon rounded="md" color="white" @click="authStore.logout()">
                            <PowerIcon size="22" />
                            <v-tooltip activator="parent" location="top">Logout</v-tooltip>
                        </v-btn>
                    </div>
                </div>
            </div>
            <v-list class="py-6 px-4">
                <!---Menu Loop -->
                <template v-for="(item, i) in getAuthSideBar">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
