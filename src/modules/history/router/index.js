import HistoryPage from '../pages/HistoryPage.vue';

export default [
  {
    path: '/historial',
    name: 'history',
    component: HistoryPage,
    meta: { roles: ['admin', 'coordinador'] }
  }
];
