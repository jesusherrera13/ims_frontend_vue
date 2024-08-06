<script setup lang="ts">
import { ref } from 'vue';
const panel = ref([0, 1]);
const disabled = ref(false);
</script>

<template>
    <v-card variant="outlined" class="bg-surface">
        <v-card-item>
            <div class="d-flex mb-3">
                <v-avatar size="32" color="primary" class="mr-2">
                    <PhotoIcon size="16" />
                </v-avatar>
                <v-btn color="inherit" type="upload" variant="plain" class="opacity-1"> Foto / Video </v-btn>
                <v-btn color="inherit" variant="plain" class="opacity-1">
                    <v-avatar size="32" color="secondary" class="mr-2">
                        <NotebookIcon size="16" />
                    </v-avatar>
                    Artículo
                </v-btn>
                <v-btn color="primary" variant="flat" class="ml-auto">Publicar</v-btn>
            </div>
            <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                    <v-expansion-panel-title>Panel 1</v-expansion-panel-title>
                    <v-expansion-panel-text> Some content </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-title>Panel 2</v-expansion-panel-title>
                    <v-expansion-panel-text> Some content </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-title>Panel 3</v-expansion-panel-title>
                    <v-expansion-panel-text> Some content </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>

            <div class="d-flex mt-3">
                <v-avatar size="32" color="primary" class="mr-2">
                    <PhotoIcon size="16" />
                </v-avatar>
                <v-btn color="inherit" type="upload" variant="plain" class="opacity-1"> Foto / Video </v-btn>
                <v-btn color="inherit" variant="plain" class="opacity-1">
                    <v-avatar size="32" color="secondary" class="mr-2">
                        <NotebookIcon size="16" />
                    </v-avatar>
                    Artículo
                </v-btn>
                <v-btn color="primary" variant="flat" class="ml-auto">Publicar</v-btn>
            </div>
        </v-card-item>
    </v-card>
</template>
