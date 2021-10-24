import { DateTime } from 'luxon';

export const DateTimeClassTransformer = {
  toPlain: ({ value }: { value: DateTime }) => value.toISO(),
  toClass: ({ value }: { value: string }) => DateTime.fromSQL(value),
};
