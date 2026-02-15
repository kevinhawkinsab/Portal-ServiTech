import appointmentsRoutes from '../modules/appointments/router';
import visitRoutes from '../modules/visit-registration/router';
import historyRoutes from '../modules/history/router';

export const moduleRoutes = [...appointmentsRoutes, ...visitRoutes, ...historyRoutes];
