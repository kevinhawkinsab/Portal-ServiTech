<script setup>
import { CalendarCheck2, ClipboardCheck, History, Wrench } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const authStore = useAuthStore();

const navItems = computed(() => [
  { to: '/citas', label: 'Gestión de Citas', icon: CalendarCheck2 },
  { to: '/visita', label: 'Registro de Visita', icon: ClipboardCheck },
  { to: '/historial', label: 'Historial', icon: History }
]);

const roles = ['admin', 'coordinador', 'tecnico'];
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">
    <header class="border-b bg-white px-6 py-4 shadow-sm">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <Wrench class="h-6 w-6 text-indigo-600" />
          <div>
            <h1 class="text-xl font-semibold">Servicio Técnico</h1>
            <p class="text-sm text-slate-500">Gestión de mantenimiento y visitas en terreno</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm text-slate-600">Rol activo</label>
          <select
            :value="authStore.role"
            class="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            @change="authStore.setRole($event.target.value)"
          >
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
      </div>
    </header>

    <div class="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-[250px_1fr]">
      <aside class="rounded-2xl bg-white p-4 shadow-sm">
        <nav class="space-y-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition"
            :class="route.path === item.to ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100'"
          >
            <component :is="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </RouterLink>
        </nav>
      </aside>
      <main class="min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>
