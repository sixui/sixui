import type { IPopoverBaseTriggerProps } from './PopoverBaseTrigger.types';
import { isFunction } from '~/helpers/isFunction';
import { usePopoverBaseContext } from './PopoverBase.context';

export const PopoverBaseTrigger: React.FC<IPopoverBaseTriggerProps> = (
  props,
) => {
  const { children } = props;
  const context = usePopoverBaseContext();

  return isFunction(children) ? children(context) : children;
};
