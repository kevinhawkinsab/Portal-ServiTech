<script setup>
import { computed } from 'vue';
import { Eye, Download } from 'lucide-vue-next';
import { useAppointmentsStore } from '../../../stores/appointments';

const store = useAppointmentsStore();

const rows = computed(() =>
  store.appointments.map((item, index) => ({
    idOrder: `OT-${1000 + index}`,
    request: item.subject,
    visitType: item.inspectionType,
    customer: item.clientId,
    technician: item.technician,
    datetime: item.date
  }))
);
</script>

<template>
  <section class="rounded-2xl bg-white p-5 shadow-sm">
    <h2 class="mb-4 text-lg font-semibold">Historial de Visitas</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="border-b text-left text-slate-500">
            <th class="p-2">ID Orden</th>
            <th class="p-2">Solicitud</th>
            <th class="p-2">Tipo de Visita</th>
            <th class="p-2">Cliente</th>
            <th class="p-2">Técnico</th>
            <th class="p-2">Fecha y Hora</th>
            <th class="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.idOrder" class="border-b">
            <td class="p-2">{{ row.idOrder }}</td>
            <td class="p-2">{{ row.request }}</td>
            <td class="p-2">{{ row.visitType }}</td>
            <td class="p-2">{{ row.customer }}</td>
            <td class="p-2">{{ row.technician }}</td>
            <td class="p-2">{{ row.datetime }}</td>
            <td class="p-2">
              <div class="flex items-center gap-2">
                <button class="rounded-md border p-2 text-slate-600" title="Ver PDF"><Eye class="h-4 w-4" /></button>
                <button class="rounded-md border p-2 text-slate-600" title="Descargar PDF"><Download class="h-4 w-4" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
