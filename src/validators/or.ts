import { ValueValidator, ValidationError } from '../core';

/**
 * Create a validator that requires at least one validator to be valid.
 */
export function or<T = {}>(
  ...validators: ValueValidator<T>[]
): ValueValidator<T> {
  return ctx => {
    const errors: ValidationError[] = [];

    for (let validator of validators) {
      const result = validator(ctx);
      if (result.ok) {
        return result;
      }
      errors.push(...result.errors);
    }

    return { ok: false, errors };
  };
}
