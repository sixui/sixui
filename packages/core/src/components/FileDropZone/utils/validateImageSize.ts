import type { ISize } from '~/utils/types';
import type {
  INumericValueConstraints,
  INumericValueValidationResult,
} from '~/utils/validateNumericValue';
import { validateNumericValue } from '~/utils/validateNumericValue';

export type IImageSizeConstraints = Partial<ISize<INumericValueConstraints>>;

export type IImageSizeValidationResult =
  | true
  | ISize<INumericValueValidationResult>;

export const validateImageSize = (
  size: ISize,
  acceptedSize?: IImageSizeConstraints,
): IImageSizeValidationResult => {
  const widthValidation = acceptedSize?.width
    ? validateNumericValue(size.width, acceptedSize.width)
    : true;
  const heightValidation = acceptedSize?.height
    ? validateNumericValue(size.height, acceptedSize.height)
    : true;

  const validationResult =
    widthValidation === true && heightValidation === true
      ? true
      : { width: widthValidation, height: heightValidation };

  return validationResult;
};
