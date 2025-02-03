import { createUseExternalEvents } from '~/utils';
import { COMPONENT_ID } from './Layers.constants';

type ILayersEvents = {
  show: () => void;
};

export const [useModalsEvents, createEvent] =
  createUseExternalEvents<ILayersEvents>(COMPONENT_ID);
