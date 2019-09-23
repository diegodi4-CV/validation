import { ValueValidator, ValidationResult } from '../core';

export const ExpectedEmail = 'EXPECTED_EMAIL';

/**
 * Require an email.
 */
export function email(): ValueValidator<string> {
  return ({ value, field }): ValidationResult<string> => {
    if (typeof value === 'string') {
      if (/^[^@]+@[^@]+$/.test(value)) {
        return { value, ok: true };
      }
    }
    return {
      ok: false,
      errors: [
        {
          id: ExpectedEmail,
          text: `enter a valid email address`,
          field,
        },
      ],
    };
  };
}
