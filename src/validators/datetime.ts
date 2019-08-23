import { parse as parseDate, parseISO } from 'date-fns';

import { ValueValidator, ValidationMode } from '../core';

export const ExpectedDateFormat = 'EXPECTED_DATE_FORMAT';

export function datetime({
  format,
}: {
  format?: string;
} = {}): ValueValidator<Date> {
  return ({ value, field, mode }) => {
    if (mode !== ValidationMode.Strict) {
      if (format) {
        value = parseDate(value, format, new Date());
      } else {
        value = parseISO(value);
      }
    }
    if (!isNaN(new Date(value).getTime())) {
      return { ok: true, value };
    }
    return {
      ok: false,
      errors: [
        {
          id: ExpectedDateFormat,
          text:
            `expected a date` +
            (typeof format === 'string' ? ` with format ${format}` : ``),
          field: field,
        },
      ],
    };
  };
}
