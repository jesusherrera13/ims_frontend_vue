<script setup lang="ts">
import { ref } from 'vue';
import { TrashIcon, RefreshIcon } from 'vue-tabler-icons';
import { useProviderStore } from '@/stores/provider/provider';
import { useSyncStore } from '@/stores/provider/sync';

const store = useProviderStore();
const storeSync = useSyncStore();
const productPerformanceData = ref([]);

const props = defineProps({ provider: Object });

function handleClick(item: any) {
    store.syncModule(item.service_provider_id, item.module);
}

function logUnlock() {
    storeSync.logUnlock(props.provider?.id);
}
</script>

<template>
    <v-card elevation="10">
        <v-card-text>
            <h2 class="text-h5">{{ provider?.name }}</h2>
            <v-row>
                <v-col cols="12" class="text-right">
                    <v-btn color="primary" flat class="mr-1" @click="logUnlock">
                        <v-icon class="mr-2">mdi-refresh</v-icon>
                        Desbloquear
                    </v-btn>
                    <v-btn
                        color="secondary"
                        flat
                        class="mr-1"
                        @click="handleClick({ service_provider_id: provider?.id, module: 'sync_all' })"
                    >
                        <v-icon class="mr-2">mdi-refresh</v-icon>
                        Actualizar todo
                    </v-btn>
                </v-col>
            </v-row>
            <v-table class="month-table custom-px-0 mt-4">
                <template v-slot:default>
                    <tbody>
                        <tr class="month-item" v-for="item in provider?.modules" :key="item">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar class="rounded-lg overflow-hidden" size="70">
                                        <!-- <img :src="item.avatar" :alt="item.avatar" width="90" height="70" class="rounded-lg" /> -->
                                        <img
                                            src="@/assets/images/profile/4.jpg"
                                            :alt="item.avatar"
                                            width="90"
                                            height="70"
                                            class="rounded-lg"
                                        />
                                    </v-avatar>
                                    <div class="ml-3">
                                        <h6 class="text-subtitle-1 text-no-wrap font-weight-medium">
                                            {{ item.name }}
                                        </h6>
                                        <div class="text-subtitle-2 text-no-wrap textSecondary mt-1">xxx</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="text-body-2 textSecondary">2024-07-17</span>
                                <h6 class="font-weight-medium text-body-1 mb-1">${{ item.earn }}</h6>
                            </td>
                            <td class="pl-0">
                                <v-btn icon color="transparent" flat @click="handleClick(item)">
                                    <RefreshIcon size="20" />
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-table>
        </v-card-text>
    </v-card>
</template>
