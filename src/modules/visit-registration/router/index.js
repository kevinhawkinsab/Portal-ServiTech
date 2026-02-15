import VisitRegistrationPage from '../pages/VisitRegistrationPage.vue';

export default [
  {
    path: '/visita',
    name: 'visit-registration',
    component: VisitRegistrationPage,
    meta: { roles: ['admin', 'tecnico'] }
  }
];
