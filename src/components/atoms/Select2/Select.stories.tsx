import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
  faEgg,
  faFish,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';

import {
  FruitSelect,
  type IFruitSelectOption,
  type IFruitSelectProps,
} from './FruitSelect';
import { Button } from '../Button';
import type {
  IItemPredicate,
  IItemRenderer,
  IItemRendererProps,
} from './ListItemProps';

const meta = {
  component: FruitSelect,
} satisfies Meta<typeof FruitSelectFruitSelect>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 350,
    // Only for screenshot:
    // paddingBottom: 305,
  },
});

const defaultArgs = {
  // sx: styles.host,
} satisfies Partial<IFruitSelectProps>;

const fruits: Array<IFruitSelectOption> = [
  { name: 'Apple', icon: faAppleWhole, value: 'apple' },
  { name: 'Lemon', icon: faLemon, value: 'lemon' },
  { name: 'Carrot', icon: faCarrot, value: 'carrot' },
  { name: 'Pepper', icon: faPepperHot, value: 'pepper' },
  { name: 'Egg', icon: faEgg, value: 'egg' },
  { name: 'Fish', icon: faFish, value: 'fish' },
  // { name: 'Banana', value: 'banana' },
  // { name: 'Cucumber', value: 'cucumber' },
  // { name: 'Grape', value: 'grape' },
  // { name: 'Kiwi', value: 'kiwi' },
  // { name: 'Mango', value: 'mango' },
  // { name: 'Orange', value: 'orange' },
  // { name: 'Peach', value: 'peach' },
  // { name: 'Pineapple', value: 'pineapple' },
  // { name: 'Strawberry', value: 'strawberry' },
  // { name: 'Watermelon', value: 'watermelon' },
  // { name: 'Avocado', value: 'avocado' },
  // { name: 'Blueberry', value: 'blueberry' },
  // { name: 'Cherry', value: 'cherry' },
  // { name: 'Coconut', value: 'coconut' },
  // { name: 'Grapefruit', value: 'grapefruit' },
  // { name: 'Lime', value: 'lime' },
  // { name: 'Pomegranate', value: 'pomegranate' },
  // { name: 'Raspberry', value: 'raspberry' },
  // { name: 'Tomato', value: 'tomato' },
  // { name: 'Blackberry', value: 'blackberry' },
  // { name: 'Cantaloupe', value: 'cantaloupe' },
  // { name: 'Fig', value: 'fig' },
  // { name: 'Honeydew', value: 'honeydew' },
  // { name: 'Mandarin', value: 'mandarin' },
  // { name: 'Nectarine', value: 'nectarine' },
  // { name: 'Plum', value: 'plum' },
  // { name: 'Raisin', value: 'raisin' },
  // { name: 'Tangerine', value: 'tangerine' },
];

// const filterFruit: IItemPredicate<IFruit> = (props) => {
//   const { query, item: fruit, exactMatch } = props;
//   const normalizedName = fruit.name.toLowerCase();
//   const normalizedQuery = query.toLowerCase();

//   if (exactMatch) {
//     return normalizedName === normalizedQuery;
//   } else {
//     return normalizedName.indexOf(normalizedQuery) >= 0;
//   }
// };

const renderFruit: IItemRenderer<IFruitSelectOption> = (fruit, itemProps) => {
  const { handleClick, handleFocus, index, modifiers } = itemProps;
  if (!modifiers.matchesPredicate) {
    return null;
  }

  return (
    <div
      key={index}
      // selected={modifiers.selected}
      // disabled={modifiers.disabled}
      // onClick={handleClick}
      // onFocus={handleFocus}
      // roleStructure='listoption'
    >
      {fruit.name}
    </div>
  );
};

export const Basic: IStory = {
  render: (props) => <FruitSelect {...props} />,
  args: {
    ...defaultArgs,
    items: fruits,
    // itemPredicate: filterFruit,
    itemRenderer: renderFruit,
    noResults: 'NO_RESULTS',
    // onItemSelect={setSelectedFilm}
    // onChange: (...args) => void sbHandleEvent('onChange', args),
    // onFocus: (...args) => void sbHandleEvent('onFocus', args),
    // onBlur: (...args) => void sbHandleEvent('onBlur', args),
    // onClick: (...args) => void sbHandleEvent('onClick', args),
    onItemSelect: (...args) => void sbHandleEvent('onItemSelect', args),
    // value: fruits[1],
  },
};

export default meta;
