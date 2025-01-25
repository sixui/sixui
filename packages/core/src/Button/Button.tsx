import cx from 'clsx';

import type { IButton } from './Button.types';
import { buttonClassNames } from './Button.css';

export const Button: React.FC<IButton> = (props) => {
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
