import { DateTime } from 'luxon';
import { TransformationType, TransformFnParams } from 'class-transformer';

export function dateTimeToClassTransformer(value: string): DateTime {
  return DateTime.fromISO(value);
}

export function dateTimeToPlainTransformer(value: DateTime): string {
  return value.toISO();
}

export function dateTimeTransformer(params: TransformFnParams): DateTime | string {
  switch (params.type) {
    case TransformationType.PLAIN_TO_CLASS:
      return dateTimeToClassTransformer(params.value);
    case TransformationType.CLASS_TO_PLAIN:
      return dateTimeToPlainTransformer(params.value);
    default:
      return params.value;
  }
}
