import AppointmentsPage from '../pages/AppointmentsPage.vue';

export default [
  {
    path: '/citas',
    name: 'appointments',
    component: AppointmentsPage,
    meta: { roles: ['admin', 'coordinador', 'tecnico'] }
  }
];
