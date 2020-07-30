import createModalProvider from './createModalProvider';
import StartModalContent from './StartModalContent';
import StopModalContent from './StopModalContent';
import UpdateModalContent from './UpdateModalContent';

export const START_MODAL = 'start_modal';
export const STOP_MODAL = 'stop_modal';
export const UPDATE_MODAL = 'update_modal';

const CONTENT_MAP = {
  [START_MODAL]: StartModalContent,
  [STOP_MODAL]: StopModalContent,
  [UPDATE_MODAL]: UpdateModalContent,
};

export default createModalProvider(CONTENT_MAP);
