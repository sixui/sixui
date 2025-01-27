import cx from 'clsx';

import type { IButtonProps } from './Button.types';
import { buttonClassNames } from './Button.css';

export const Button: React.FC<IButtonProps> = (props) => {
  const { className, children, onClick, ...other } = props;

  return (
    <button
      className={cx(buttonClassNames.root, className)}
      onClick={onClick}
      {...other}
    >
      {children}
    </button>
  );
};
