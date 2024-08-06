<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/apps/user/user';
import { useModuloStore } from '@/stores/apps/sistema/modulo';
import { formatDistanceToNowStrict } from 'date-fns';

import { useDisplay } from 'vuetify';

const { lgAndUp } = useDisplay();

const store = useUserStore();
const authStore = useAuthStore();
const storeModulo = useModuloStore();

onMounted(() => {
    storeModulo.fetchAccesoModulos();
});

const selected = ref([]);
const selectionType = ref('leaf');
const selection = ref([]);

const headers: any = ref([{ title: 'Módulo', align: 'start', key: 'nombre', sortable: false }]);

const chatDetail: any = computed(() => {
    // return store.chats[store.chatContent - 1];
});

const getModulos: any = computed(() => {
    return storeModulo.modulos.map((item) => {
        // console.log(item);
        return item;
    });
});

const modulos = ref(getModulos);

const Rpart = ref(lgAndUp ? true : false);

function toggleRpart() {
    // Rpart.value = !Rpart.value;
}

function handleClick(e: any, row: any) {
    let user_modules = [];
    var _checked = e.target.checked;
    var inputElements = document.getElementsByClassName(`class-${row.id}`);

    for (var i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = _checked;
    }

    inputElements = document.getElementsByClassName('chk');

    for (var i = 0; i < inputElements.length; i++) {
        var _chekbox = inputElements[i] as HTMLInputElement;
        if (_chekbox.checked) user_modules.push(_chekbox.getAttribute('dbid'));
    }

    storeModulo.storeUserModules(store.user.id, user_modules);
}

watch([() => store.user.id], () => {
    selected.value = [];
    var inputElements = document.getElementsByClassName('chk');

    for (var i = 0; i < inputElements.length; i++) {
        (inputElements[i] as HTMLInputElement).checked = false;
    }

    storeModulo.accessUserModules(store.user.id);
});

watch([() => storeModulo.access_user_modules], () => {
    let tmp = storeModulo.access_user_modules.map((item: any) => {
        return item.modulo_id;
    });

    console.log(tmp);

    var inputElements = document.getElementsByClassName('chk');

    for (var i = 0; i < inputElements.length; i++) {
        var _checkbox = inputElements[i] as HTMLInputElement;
        // storeModulo.access_user_modules;
        for (var j in tmp) {
            console.log(tmp[j], _checkbox.getAttribute('dbid'));
            if (tmp[j] == _checkbox.getAttribute('dbid')) _checkbox.checked = true;
        }
    }
});
</script>
<template>
    <div v-if="store.user.id" class="customHeight">
        <div>
            <div class="d-flex align-center gap-3 pa-4">
                <!---Topbar Row-->
                <div class="d-flex gap-2 align-center">
                    <!---User Avatar-->
                    <v-avatar>
                        <!-- <img :src="store.user.thumb" alt="pro" width="50" /> -->
                    </v-avatar>

                    <!---Name & Last seen-->
                    <div>
                        <h5 class="text-h5 mb-n1">{{ store.user.name }}</h5>
                    </div>
                </div>
                <!---Topbar Icons-->
                <div class="ml-auto d-flex">
                    <v-btn icon variant="text" class="text-medium-emphasis">
                        <PhoneIcon size="24" />
                    </v-btn>
                    <v-btn icon variant="text" class="text-medium-emphasis">
                        <VideoPlusIcon size="24" />
                    </v-btn>
                    <v-btn icon variant="text" class="text-medium-emphasis" @click="toggleRpart">
                        <DotsVerticalIcon size="24" />
                    </v-btn>
                </div>
                <!---Topbar Icons-->
            </div>
            <v-divider />
            <!---Chat History-->
            <!-- <perfect-scrollbar class="rightpartHeight">
                <div class="d-flex">
                    <div id="d-accesos" class="w-100">
                        <div v-for="item in getModulos" class="ma-1">
                            <input
                                type="checkbox"
                                :class="`ml-${(item.nivel - 1) * 4} chk ${item.clase}`"
                                @click="handleClick($event, item)"
                                :dbid="item.id"
                            />
                            {{ item.nombre }}
                        </div>
                    </div>
                    <div class="right-sidebar" v-if="Rpart">
                        <v-sheet>
                        </v-sheet>
                    </div>
                </div>
            </perfect-scrollbar> -->
        </div>
        <v-divider />
        <!---Chat send-->
        <!-- <ChatSendMsg /> -->
    </div>
</template>
<style lang="scss">
.rightpartHeight {
    height: 530px;
}
.badg-dotDetail {
    left: -9px;
    position: relative;
    bottom: -10px;
}

.toggleLeft {
    position: absolute;
    right: 15px;
    top: 15px;
}
.right-sidebar {
    width: 320px;
    border-left: 1px solid rgb(var(--v-theme-borderColor));
    transition: 0.1s ease-in;
    flex-shrink: 0;
}

.HideLeftPart {
    display: none;
}

@media (max-width: 960px) {
    .right-sidebar {
        position: absolute;
        right: -320px;
        &.showLeftPart {
            right: 0;
            z-index: 2;
            box-shadow: 2px 1px 20px rgba(0, 0, 0, 0.1);
        }
    }
    .boxoverlay {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 1;
        background: rgba(0, 0, 0, 0.2);
    }
}
</style>
