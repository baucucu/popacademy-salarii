import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, BookingsPage, SalariiPage } from './pages';

const routes = [
  {
    path: '/bookings',
    component: BookingsPage
  },
  {
    path: '/salarii',
    component: SalariiPage
  },
  {
    path: '/home',
    component: HomePage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
