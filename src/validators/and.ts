import { ValueValidator, ValidationError } from '../core';

/**
 * Create a validator that requires all validators to be valid.
 */
export function and<T = {}>(
  ...validators: ValueValidator<T>[]
): ValueValidator<T> {
  return ({ value, field, mode }) => {
    let anyError = false;
    const errors: ValidationError[] = [];

    for (let validator of validators) {
      const result = validator({ value, field, mode });

      if (result.ok) {
        value = result.value;
      } else {
        errors.push(...result.errors);
        break;
      }
    }

    if (anyError) {
      return { ok: false, errors };
    } else {
      return { ok: true, value };
    }
  };
}
