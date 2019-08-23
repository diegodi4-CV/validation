import { ValueValidator } from '../core';

export const UnexpectedField = 'UNEXPECTED_FIELD';

/**
 * Require value not to be present.
 */
export function notProvided(opts?: {
  strict?: boolean;
}): ValueValidator<undefined> {
  return ({ value, field }) => {
    const { strict = false } = opts || {};

    if ((!strict && value == undefined) || value === undefined) {
      return { value: undefined, ok: true };
    }
    return {
      ok: false,
      errors: [
        {
          id: UnexpectedField,
          text: 'unexpected value',
          field,
        },
      ],
    };
  };
}
