import { createUseExternalEvents } from '~/utils';
import { COMPONENT_ID } from './Overlays.constants';

type IOverlaysEvents = {
  show: () => void;
};

export const [useModalsEvents, createEvent] =
  createUseExternalEvents<IOverlaysEvents>(COMPONENT_ID);
