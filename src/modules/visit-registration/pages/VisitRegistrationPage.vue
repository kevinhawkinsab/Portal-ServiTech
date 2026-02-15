<script setup>
import { reactive } from 'vue';
import SignatureCanvas from '../components/SignatureCanvas.vue';
import { useAppointmentsStore } from '../../../stores/appointments';

const store = useAppointmentsStore();

const form = reactive({
  orderNumber: store.generateOrderNumber(),
  assignedAt: new Date().toISOString().slice(0, 16),
  visitAt: '',
  technician: '',
  customerName: '',
  phone: '',
  contact: '',
  customerType: '',
  address: '',
  problem: '',
  inHour: '',
  outHour: '',
  results: '',
  recommendations: '',
  billing: ''
});

const inventory = reactive([
  { quantity: 1, serial: '', model: '', description: '' }
]);

const addRow = () => inventory.push({ quantity: 1, serial: '', model: '', description: '' });
const removeRow = (index) => inventory.splice(index, 1);
</script>

<template>
  <section class="space-y-4">
    <div class="rounded-2xl bg-white p-5 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold">Registro de Visita Técnica</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-xl border p-4">
          <h3 class="mb-3 font-medium">Datos de Orden</h3>
          <div class="space-y-2 text-sm">
            <input v-model="form.orderNumber" class="w-full rounded-lg border p-2" readonly />
            <input v-model="form.technician" class="w-full rounded-lg border p-2" placeholder="Técnico" />
            <input v-model="form.assignedAt" type="datetime-local" class="w-full rounded-lg border p-2" />
            <input v-model="form.visitAt" type="datetime-local" class="w-full rounded-lg border p-2" />
          </div>
        </div>

        <div class="rounded-xl border p-4">
          <h3 class="mb-3 font-medium">Información del Cliente</h3>
          <div class="space-y-2 text-sm">
            <input v-model="form.customerName" class="w-full rounded-lg border p-2" placeholder="Nombre" />
            <input v-model="form.phone" class="w-full rounded-lg border p-2" placeholder="Teléfono" />
            <input v-model="form.contact" class="w-full rounded-lg border p-2" placeholder="Contacto" />
            <input v-model="form.customerType" class="w-full rounded-lg border p-2" placeholder="Tipo de Cliente" />
            <input v-model="form.address" class="w-full rounded-lg border p-2" placeholder="Dirección" />
          </div>
        </div>
      </div>

      <div class="mt-4 rounded-xl border p-4">
        <h3 class="mb-3 font-medium">Diagnóstico</h3>
        <div class="grid gap-2 md:grid-cols-2">
          <textarea v-model="form.problem" class="rounded-lg border p-2" rows="3" placeholder="Descripción del problema" />
          <textarea v-model="form.results" class="rounded-lg border p-2" rows="3" placeholder="Resultados" />
          <input v-model="form.inHour" type="time" class="rounded-lg border p-2" />
          <input v-model="form.outHour" type="time" class="rounded-lg border p-2" />
          <textarea v-model="form.recommendations" class="md:col-span-2 rounded-lg border p-2" rows="2" placeholder="Recomendaciones" />
        </div>
      </div>

      <div class="mt-4 rounded-xl border p-4">
        <div class="mb-3 flex items-center justify-between">
          <h3 class="font-medium">Inventario: Equipos y Accesorios</h3>
          <button class="rounded-lg bg-indigo-600 px-3 py-2 text-xs text-white" @click="addRow">Agregar fila</button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="border-b text-left text-slate-500">
                <th class="p-2">Cantidad</th><th class="p-2">Serie</th><th class="p-2">Modelo</th><th class="p-2">Descripción</th><th class="p-2" />
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in inventory" :key="index" class="border-b">
                <td class="p-2"><input v-model="item.quantity" type="number" class="w-20 rounded border p-1" /></td>
                <td class="p-2"><input v-model="item.serial" class="rounded border p-1" /></td>
                <td class="p-2"><input v-model="item.model" class="rounded border p-1" /></td>
                <td class="p-2"><input v-model="item.description" class="w-full rounded border p-1" /></td>
                <td class="p-2"><button class="text-red-600" @click="removeRow(index)">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-4 rounded-xl border p-4">
        <h3 class="mb-2 font-medium">Facturación</h3>
        <textarea v-model="form.billing" class="w-full rounded-lg border p-2" rows="3" placeholder="Montos y detalles de cobro" />
      </div>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="rounded-xl border p-4"><SignatureCanvas title="Firma Cliente" /></div>
        <div class="rounded-xl border p-4"><SignatureCanvas title="Firma Técnico" /></div>
      </div>
    </div>
  </section>
</template>
