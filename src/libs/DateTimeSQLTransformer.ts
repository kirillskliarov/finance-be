import { ValueTransformer } from 'typeorm';
import { DateTime } from 'luxon';

export class DateTimeSQLTransformer implements ValueTransformer {
  from(value: DateTime): string {
    return value.toSQL();
  }

  to(value: string): DateTime {
    return DateTime.fromSQL(value);
  }
}

export const dateTimeSQLTransformer = new DateTimeSQLTransformer();
