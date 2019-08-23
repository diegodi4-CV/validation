import { ValueValidator } from '../core';

export const ExpectedString = 'EXPECTED_STRING';
export const StringTooLong = 'STRING_TOO_LONG';
export const StringTooShort = 'STRING_TOO_SHORT';

/**
 * Require a text value.
 */
export function text(
  maxLength?: number,
  minLength: number = 1,
): ValueValidator<string> {
  return ({ value, field }) => {
    if (typeof value !== 'string') {
      return {
        ok: false,
        errors: [
          {
            id: ExpectedString,
            text: `must be text`,
            field,
          },
        ],
      };
    } else if (maxLength !== undefined && value.length > maxLength) {
      return {
        ok: false,
        errors: [
          {
            id: StringTooLong,
            text: `must be ${maxLength} characters or less`,
            field,
          },
        ],
      };
    } else if (minLength !== undefined && value.length < minLength) {
      return {
        ok: false,
        errors: [
          {
            id: StringTooShort,
            text:
              minLength === 1
                ? `required`
                : `must be at least ${minLength} characters`,
            field,
          },
        ],
      };
    }
    return { value, ok: true };
  };
}
