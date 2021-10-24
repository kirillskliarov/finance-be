import { ValueTransformer } from 'typeorm';
import { DateTime } from 'luxon';

export const dateTimeSQLTransformer: ValueTransformer = {
  from: (value: string) => DateTime.fromSQL(value),
  to: (value: DateTime) => value.toSQL(),
};
