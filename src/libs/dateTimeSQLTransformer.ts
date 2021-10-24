import { ValueTransformer } from 'typeorm';
import { DateTime } from 'luxon';

export const dateTimeSQLTransformer: ValueTransformer = {
  from: (value: string) => {
    return DateTime.fromSQL(value);
  },
  to: (value: DateTime) => {
    return value.toSQL();
  },
};
