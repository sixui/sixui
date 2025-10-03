import { useId } from './useId';

export interface IUseClassNameProps {
  overrideClassName?: string;
  id?: string;
  prefix?: string;
}

export const useClassName = (props?: IUseClassNameProps): string => {
  const id = useId(props?.id).replace(/:/g, '');
  const prefix = props?.prefix ? `__${props.prefix}` : '';
  const className = `__sixui${prefix}__${id}`;

  return props?.overrideClassName ?? className;
};
