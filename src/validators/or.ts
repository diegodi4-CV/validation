import { ValueValidator, ValidationError, ValidationResult } from '../core';

/**
 * Create a validator that requires at least one validator to be valid.
 */
export function or<T = {}>(
  ...validators: ValueValidator<T>[]
): ValueValidator<T> {
  return (ctx): ValidationResult<T> => {
    const errors: ValidationError[] = [];

    for (const validator of validators) {
      const result = validator(ctx);
      if (result.ok) {
        return result;
      }
      errors.push(...result.errors);
    }

    return { ok: false, errors };
  };
}
