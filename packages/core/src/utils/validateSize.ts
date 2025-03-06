import type { ISize } from '~/utils/types';
import type {
  IDimensionAcceptedValue,
  IDimensionValidationResult,
} from './validateDimension';
import { validateDimension } from './validateDimension';

export type ISizeAcceptedValue = Partial<ISize<IDimensionAcceptedValue>>;

export type ISizeValidationResult = true | ISize<IDimensionValidationResult>;

export const validateSize = (
  size: ISize,
  acceptedSize?: ISizeAcceptedValue,
): ISizeValidationResult => {
  const widthValidation = acceptedSize?.width
    ? validateDimension(size.width, acceptedSize.width)
    : true;
  const heightValidation = acceptedSize?.height
    ? validateDimension(size.height, acceptedSize.height)
    : true;

  const validationResult =
    widthValidation === true && heightValidation === true
      ? true
      : { width: widthValidation, height: heightValidation };

  return validationResult;
};
