import { SVGProps } from 'react';
const SvgPerson = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M24 20.993V24H0v-2.996A14.98 14.98 0 0 1 12.004 15c4.904 0 9.26 2.354 11.996 5.993M16.002 8.999a4 4 0 1 1-8 0 4 4 0 0 1 8 0' />
  </svg>
);
export { SvgPerson };
