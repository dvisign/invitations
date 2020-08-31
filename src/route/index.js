import Loadable from 'react-loadable';
import Loading from '../components/common/Loading';

export const Invitation = Loadable({
  loader: () => import('./Invitation'),
  loading: Loading,
});
export const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
});
