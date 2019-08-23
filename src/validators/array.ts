import {
  ValueValidator,
  ValidationResult,
  ValidationMode,
  ValidationError,
} from '../core';

export const ExpectedArray = 'EXPECTED_ARRAY';

/**
 * Expect the value to be an array.
 */
export function array<T>(
  elem: ValueValidator<T>,
  arraySplit?: string,
): ValueValidator<T[]> {
  return ({ value, field, mode }): ValidationResult<T[]> => {
    if (mode === ValidationMode.String) {
      if (typeof value === 'string') {
        value = value.split(arraySplit || ',').map(x => x.trim());
      }
    }

    if (Array.isArray(value)) {
      let anyError = false;
      let errors: ValidationError[] = [];
      let results: T[] = [];

      for (let i = 0; i < value.length; ++i) {
        const subctx = {
          value: value[i],
          field: `${field}[${i}]`,
          mode,
        };
        const subresult = elem(subctx);

        if (subresult.ok) {
          results[i] = subresult.value;
        } else {
          anyError = true; // in case there are no error elements
          errors.push(...subresult.errors);
        }
      }

      if (anyError) {
        return { ok: false, errors };
      } else {
        return { ok: true, value: results };
      }
    }
    return {
      ok: false,
      errors: [
        {
          id: ExpectedArray,
          text:
            `expected list` +
            (arraySplit ? ` seperated by '${arraySplit}'` : ''),
          field,
        },
      ],
    };
  };
}
