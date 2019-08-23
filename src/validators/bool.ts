import { ValueValidator, ValidationMode } from '../core';

export const ExpectedBoolean = 'EXPECTED_BOOLEAN';

/**
 * Require an boolean value.
 */
export function bool(): ValueValidator<boolean> {
  return ({ value, field, mode }) => {
    if (mode === ValidationMode.String) {
      if (typeof value === 'string') {
        switch (value) {
          case 'true':
            value = true;
            break;
          case 'false':
            value = false;
            break;
        }
      }
    }
    if (typeof value === 'boolean') {
      return { ok: true, value };
    }
    return {
      ok: false,
      errors: [
        {
          id: ExpectedBoolean,
          text: `expected boolean`,
          field,
        },
      ],
    };
  };
}
