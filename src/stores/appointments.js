import { defineStore } from 'pinia';

const defaultPendingTasks = [
  { id: 'task-1', title: 'Inspección de Caldera' },
  { id: 'task-2', title: 'Mantención Preventiva' },
  { id: 'task-3', title: 'Cambio de Válvula' }
];

export const useAppointmentsStore = defineStore('appointments', {
  state: () => ({
    appointments: [],
    pendingTasks: defaultPendingTasks,
    nextOrderNumber: 1001,
    technicians: ['Carlos Díaz', 'María Pérez', 'Juan Soto'],
    statuses: ['pendiente', 'confirmada', 'completada']
  }),
  actions: {
    addAppointment(appointment) {
      this.appointments.push({
        id: `apt-${Date.now()}`,
        status: 'pendiente',
        ...appointment
      });
    },
    addEventFromTask(task, date) {
      this.addAppointment({
        inspectionType: 'Mantención',
        subject: task.title,
        clientId: 'N/A',
        technician: this.technicians[0],
        tankId: '',
        notes: '',
        date
      });
      this.pendingTasks = this.pendingTasks.filter((item) => item.id !== task.id);
    },
    generateOrderNumber() {
      const current = this.nextOrderNumber;
      this.nextOrderNumber += 1;
      return `OT-${current}`;
    },
    addPendingTask(title) {
      this.pendingTasks.push({ id: `task-${Date.now()}`, title });
    }
  },
  persist: true
});
