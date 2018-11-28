import * as moment from 'moment';
import { ValueValidator } from './base';

export const ExpectedDateFormat = 'EXPECTED_DATE_FORMAT';

/**
 * Validates a date/time against the given format.
 */
export function dateFormat(
  format: string | moment.MomentBuiltinFormat,
): ValueValidator<Date> {
  return ({ value, field, options }) => {
    const { parse, strict } = options || { parse: false, strict: false };

    if (!strict && moment.isMoment(value)) {
      value = value.toDate();
    }
    if (value instanceof Date) {
      // a date instance is assumed to be right
      return { value, errors: [] };
    }
    if (parse && typeof value === 'string') {
      let m = moment(value, format, true);
      if (m.isValid()) {
        return { value: m.toDate(), errors: [] };
      }
    }
    return {
      value,
      errors: [
        {
          id: ExpectedDateFormat,
          text:
            `expected a date` + typeof format === 'string'
              ? ` with format ${format}`
              : ``,
          field: field,
        },
      ],
    };
  };
}

/**
 * Validates a value as an iso date (YYYY-MM-DD).
 */
export function isoDate() {
  return dateFormat('YYYY-MM-DD');
}

/**
 * Validates a value as an iso date and time (e.g. 2013-02-04T22:44:30.652Z).
 */
export function isoDateTime() {
  return dateFormat(moment.ISO_8601);
}
