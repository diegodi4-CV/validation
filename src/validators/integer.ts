import { ValueValidator, ValidationMode } from '../core';

export const ExpectedInteger = 'EXPECTED_INTEGER';

/**
 * Require an integer value.
 */
export function integer(): ValueValidator<number> {
  return ({ value, field, mode }) => {
    if (mode === ValidationMode.String || mode === ValidationMode.Form) {
      if (typeof value === 'string') {
        value = +value;
      }
    }
    if (Number.isInteger(value)) {
      return { value, ok: true };
    }
    return {
      ok: false,
      errors: [
        {
          id: ExpectedInteger,
          text: `expected number`,
          field,
        },
      ],
    };
  };
}
