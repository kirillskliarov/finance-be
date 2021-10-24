import { DateTime } from 'luxon';

export const dateTimeClassTransformer = ({ value }: { value: DateTime }) => {
  return value.toISO();
};
