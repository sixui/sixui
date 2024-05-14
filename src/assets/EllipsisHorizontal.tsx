import { SVGProps } from 'react';

const SvgEllipsisHorizontal = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fillRule='evenodd'
      d='M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0'
      clipRule='evenodd'
    />
  </svg>
);
export { SvgEllipsisHorizontal };
