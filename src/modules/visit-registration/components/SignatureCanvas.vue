<script setup>
import SignaturePad from 'signature_pad';
import { onMounted, ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Firma'
  }
});

const canvasRef = ref(null);
let signature;

onMounted(() => {
  signature = new SignaturePad(canvasRef.value, {
    minWidth: 1,
    maxWidth: 2.5,
    penColor: '#1e293b'
  });
});

const clear = () => signature?.clear();
</script>

<template>
  <div>
    <div class="mb-2 flex items-center justify-between">
      <p class="text-sm font-medium">{{ props.title }}</p>
      <button class="text-xs text-indigo-600" @click="clear">Limpiar</button>
    </div>
    <canvas ref="canvasRef" class="h-32 w-full rounded-lg border bg-white" />
  </div>
</template>
