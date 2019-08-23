import { ValueValidator } from '../core';

export const ExpectedValue = 'EXPECTED_VALUE';

/**
 * Require one of a list of values.
 */
export function is<T>(...values: T[]): ValueValidator<T> {
  return ({ value, field }) => {
    if (values.indexOf(<T>value) >= 0) {
      return { value, ok: true };
    }
    return {
      ok: false,
      errors: [
        {
          id: ExpectedValue,
          text: `expected one of ${values}`,
          field,
        },
      ],
    };
  };
}
