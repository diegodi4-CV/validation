import { ValueValidator } from './base';

export const ExpectedUkMobile = 'EXPECTED_UK_MOBILE';

/**
 * Validate a phone number and coalsece to E.164 format if valid.
 */
export function ukmobile(): ValueValidator<string> {
  return ({ value, field, options }) => {
    if (typeof value === 'string') {
      value = value.replace(/[ \.\-\(\)]/g, '');
      const match = value.match(/^(\+44)?0?(7[0-9]{9})$/);

      if (match !== null) {
        return { value: '+44' + match[2], errors: [] };
      }
    }
    return {
      value,
      errors: [
        {
          id: ExpectedUkMobile,
          text: `expected a UK mobile number`,
          field,
        },
      ],
    };
  };
}
