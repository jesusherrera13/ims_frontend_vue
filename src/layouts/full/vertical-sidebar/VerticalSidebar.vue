<script setup lang="ts">
import { ref, shallowRef, onMounted, computed } from 'vue';

import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';

import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/Logo.vue';
import { useAuthStore } from '@/stores/auth';
import { useAuthMenuStore } from '@/stores/authMenu';
import { MenuIcon, BrandChromeIcon } from 'vue-tabler-icons';

const customizer = useCustomizerStore();
const authStore = useAuthStore();
const authMenuStore = useAuthMenuStore();

onMounted(() => {
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

const getItems: any = computed(() => {
    return authMenuStore.items.map((item: any) => {
        var menu = { ...item };

        if (menu.parent_id) {
            if (menu.children) menu.icon = MenuIcon;
            else menu.icon = BrandChromeIcon;
        } else {
        }

        console.log(menu);

        return menu;
        // return {...item, icon:}
    });

    // return authStore.auth_sidebar;
});

const getDashboards: any = computed(() => {
    return [
        {
            id: 1,
            header: 'Dashboards',
            route: null,
            icon: null,
            orden: null,
            parent_id: null
        },
        {
            id: 2,
            title: 'Analythical',
            to: '/',
            icon: {
                name: BrandChromeIcon,
                props: {
                    size: {
                        type: [null, null],
                        default: 24
                    }
                }
            },
            orden: null,
            parent_id: 1
        }
    ];
});

const sidebarMenu = ref(getSideBarMenu);
const dashboards = ref(getDashboards);

const open = ref(['Users']);
const admins = ref([
    ['Management', 'mdi-account-multiple-outline'],
    ['Settings', 'mdi-cog-outline']
]);

const cruds = ref([
    ['Create', 'mdi-plus-outline'],
    ['Read', 'mdi-file-outline'],
    ['Update', 'mdi-update'],
    ['Delete', 'mdi-delete']
]);

const menu = ref([
    {
        title: 'Admin',
        icon: 'mdi-account-multiple-outline',
        children: [
            {
                key: 'usuarios',
                title: 'Usuarios',
                icon: 'mdi-cog-outline',
                to: '/roles'
            },
            {
                key: 'roles',
                title: 'Roles',
                icon: 'mdi-cog-outline',
                to: '/roles'
            },
            {
                key: 'regimen',
                title: 'Régimen',
                icon: 'mdi-update',
                to: '/regimen'
            }
        ]
    }
]);

const toggle = (item: any) => {
    item.visible = true;
};
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

            <v-list v-model:opened="open">
                <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

                <template v-for="(item, i) in getItems">
                    <v-list-group :value="item.title">
                        <template v-slot:activator="{ props }">
                            <!-- <v-list-item v-bind="props" :title="item.title"></v-list-item> -->
                            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title"></v-list-item>
                        </template>
                        <v-list-item
                            v-for="(item2, i2) in item.children"
                            :key="i"
                            :prepend-icon="item2.icon"
                            :title="item2.title"
                            :value="item.key"
                            @click="toggle(item2)"
                        ></v-list-item>
                    </v-list-group>
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
