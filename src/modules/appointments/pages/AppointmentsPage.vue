<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import draggable from 'vuedraggable';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { Plus } from 'lucide-vue-next';
import { useAppointmentsStore } from '../../../stores/appointments';
import AppointmentModal from '../components/AppointmentModal.vue';

const store = useAppointmentsStore();
const pendingContainer = ref(null);
const showModal = ref(false);
const selectedTech = ref('todos');
const selectedStatus = ref('todos');

const filteredAppointments = computed(() =>
  store.appointments.filter((item) => {
    const byTech = selectedTech.value === 'todos' || item.technician === selectedTech.value;
    const byStatus = selectedStatus.value === 'todos' || item.status === selectedStatus.value;
    return byTech && byStatus;
  })
);

const calendarEvents = computed(() =>
  store.appointments.map((item) => ({
    id: item.id,
    title: `${item.subject} · ${item.technician}`,
    start: item.date
  }))
);

const initExternalDragging = async () => {
  await nextTick();
  if (pendingContainer.value) {
    // eslint-disable-next-line no-new
    new Draggable(pendingContainer.value, {
      itemSelector: '.external-task',
      eventData: (eventEl) => ({
        title: eventEl.dataset.title,
        duration: '01:00'
      })
    });
  }
};

watch(() => store.pendingTasks.length, initExternalDragging);
onMounted(initExternalDragging);

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialView: 'dayGridMonth',
  editable: true,
  droppable: true,
  locale: 'es',
  events: calendarEvents.value,
  drop(info) {
    const title = info.draggedEl.dataset.title;
    const id = info.draggedEl.dataset.id;
    const task = store.pendingTasks.find((item) => item.id === id);
    if (task) {
      store.addEventFromTask(task, info.dateStr);
    }
    info.draggedEl.remove();
  }
}));
</script>

<template>
  <section class="space-y-4">
    <div class="rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-lg font-semibold">Dashboard de Gestión de Citas</h2>
        <button class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white" @click="showModal = true">
          <Plus class="h-4 w-4" /> Nueva Cita
        </button>
      </div>

      <div class="mb-3 grid gap-2 md:grid-cols-2">
        <select v-model="selectedTech" class="rounded-lg border p-2 text-sm">
          <option value="todos">Todos los técnicos</option>
          <option v-for="tech in store.technicians" :key="tech" :value="tech">{{ tech }}</option>
        </select>
        <select v-model="selectedStatus" class="rounded-lg border p-2 text-sm">
          <option value="todos">Todos los estados</option>
          <option v-for="status in store.statuses" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm">
          <thead class="border-b font-medium text-slate-500">
            <tr>
              <th class="p-2">Asunto</th>
              <th class="p-2">Cliente</th>
              <th class="p-2">Técnico</th>
              <th class="p-2">Estado</th>
              <th class="p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredAppointments" :key="item.id" class="border-b">
              <td class="p-2">{{ item.subject }}</td>
              <td class="p-2">{{ item.clientId }}</td>
              <td class="p-2">{{ item.technician }}</td>
              <td class="p-2 capitalize">{{ item.status }}</td>
              <td class="p-2">{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-[280px_1fr]">
      <div class="rounded-2xl bg-white p-4 shadow-sm">
        <h3 class="mb-3 font-semibold">Tareas Pendientes</h3>
        <p class="mb-3 text-xs text-slate-500">Reordena con drag y arrastra al calendario para crear una cita.</p>
        <div ref="pendingContainer" class="space-y-2">
          <draggable v-model="store.pendingTasks" item-key="id" animation="200">
            <template #item="{ element }">
              <div
                class="external-task cursor-grab rounded-lg border border-dashed border-indigo-300 bg-indigo-50 p-3 text-sm"
                :data-id="element.id"
                :data-title="element.title"
              >
                {{ element.title }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="rounded-2xl bg-white p-3 shadow-sm">
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>

    <AppointmentModal v-if="showModal" @close="showModal = false" @submit="store.addAppointment" />
  </section>
</template>
