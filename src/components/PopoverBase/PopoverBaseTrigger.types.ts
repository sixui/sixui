import { IPopoverBaseContextValue } from './PopoverBase.context';

export type IPopoverBaseTriggerProps = {
  children?:
    | ((props: IPopoverBaseContextValue) => React.ReactNode)
    | React.ReactNode;
};
