import type { IFilterableListItem } from './FilterableList.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleWhole,
  faCarrot,
  faLemon,
  faPepperHot,
  faLeaf,
} from '@fortawesome/free-solid-svg-icons';

export const emptyItem = {
  label: '—',
  value: '',
  placeholder: "I don't like fruits",
};

export const fruits: Array<IFilterableListItem> = [
  {
    label: 'Apple',
    value: 'apple',
    supportingText: 'Not a computer company.',
    icon: <FontAwesomeIcon icon={faAppleWhole} />,
  },
  {
    label: 'Lemon',
    value: 'lemon',
    trailingSupportingText: 'Sour!',
    icon: <FontAwesomeIcon icon={faLemon} />,
  },
  {
    label: 'Carrot',
    value: 'carrot',
    icon: <FontAwesomeIcon icon={faCarrot} />,
  },
  {
    label: 'Flowers',
    value: 'flowers',
    imageUrl:
      'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&h=168&w=168',
  },
  {
    label: 'Pepper hot',
    value: 'pepper-hot',
    supportingText: 'Spicy!',
    icon: <FontAwesomeIcon icon={faPepperHot} />,
    disabled: true,
  },
  {
    label: 'Leaf',
    value: 'leaf',
    icon: <FontAwesomeIcon icon={faLeaf} />,
  },
];
