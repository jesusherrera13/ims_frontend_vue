<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useModuloStore } from '@/stores/apps/sistema/modulo';

const store = useModuloStore();

onMounted(() => {
    store.fetchModulos();
});
</script>
