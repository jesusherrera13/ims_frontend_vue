<script setup lang="ts">
const props = defineProps({
    user: Object || Array
});
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-card variant="outlined" class="bg-surface">
                <v-card-item>
                    <h4 class="text-h4">Introduction</h4>
                    <p class="my-5 text-subtitle-1 lh-md">
                        Departamento de Informática. Desarrollo de aplicaciones web progresivas, aplicaciones móviles y de escritorio.
                    </p>
                    <div class="d-flex gap-3 mb-5">
                        <BriefcaseIcon size="21" />
                        <span class="text-h6">Corporativo Alerta</span>
                    </div>
                    <div class="d-flex gap-3 mb-5">
                        <MailIcon size="21" />
                        <span class="text-h6">{{ user?.email }}</span>
                    </div>
                    <div class="d-flex gap-3 mb-5">
                        <DeviceDesktopIcon size="21" />
                        <span class="text-h6">www.alerta.com.mx</span>
                    </div>
                    <div class="d-flex gap-3 mb-5">
                        <MapPinIcon size="21" />
                        <span class="text-h6">Mazatlán, Sinaloa, México - 82800</span>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
