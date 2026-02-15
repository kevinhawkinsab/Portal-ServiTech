<script setup>
import { reactive, ref } from 'vue';

const emit = defineEmits(['close', 'submit']);

const form = reactive({
  inspectionType: '',
  subject: '',
  clientId: '',
  technician: '',
  tankId: '',
  notes: '',
  date: ''
});
const error = ref('');

const onSubmit = () => {
  if (!form.inspectionType || !form.subject || !form.clientId || !form.technician || !form.date) {
    error.value = 'Completa todos los campos obligatorios.';
    return;
  }
  emit('submit', { ...form });
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
    <div class="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
      <h3 class="mb-4 text-lg font-semibold">Nueva Cita</h3>
      <div class="grid gap-3 md:grid-cols-2">
        <select v-model="form.inspectionType" class="rounded-lg border p-2">
          <option disabled value="">Tipo de inspección*</option>
          <option>Inspección</option>
          <option>Mantención</option>
          <option>Emergencia</option>
        </select>
        <input v-model="form.subject" class="rounded-lg border p-2" placeholder="Asunto*" />
        <input v-model="form.clientId" class="rounded-lg border p-2" placeholder="ID Cliente*" />
        <input v-model="form.technician" class="rounded-lg border p-2" placeholder="Técnico asignado*" />
        <input v-model="form.date" type="datetime-local" class="rounded-lg border p-2" />
        <input v-model="form.tankId" class="rounded-lg border p-2" placeholder="ID Tanque (opcional)" />
      </div>
      <textarea v-model="form.notes" class="mt-3 w-full rounded-lg border p-2" rows="3" placeholder="Observaciones" />
      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
      <div class="mt-4 flex justify-end gap-2">
        <button class="rounded-lg border px-4 py-2" @click="$emit('close')">Cancelar</button>
        <button class="rounded-lg bg-indigo-600 px-4 py-2 text-white" @click="onSubmit">Guardar</button>
      </div>
    </div>
  </div>
</template>
