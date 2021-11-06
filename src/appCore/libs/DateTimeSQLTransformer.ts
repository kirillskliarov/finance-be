import { ValueTransformer } from 'typeorm';
import { DateTime } from 'luxon';

export const dateTimeSQLTransformer: ValueTransformer = {
  from: (value: Date): DateTime => DateTime.fromJSDate(value),
  to: (value: DateTime): Date => value.toJSDate(),
};
