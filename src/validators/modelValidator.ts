import { ValueValidator, ValidationError } from '../core';
import { PropertyValidation, properties } from './properties';

/**
 * Validate the properties of an object using the validators provided.
 */
export function modelValidator<T>(
  model: PropertyValidation<T>,
  ...extended: PropertyValidation<T>[]
): ValueValidator<T> {
  const validators = [model, ...extended].map((x, i) => properties(x, i > 0));

  return origCtx => {
    const ctx = { ...origCtx };
    let anyErrors = false;
    const errors: ValidationError[] = [];

    for (let i = 0; i < validators.length; ++i) {
      const result = validators[i](ctx);

      if (!result.ok) {
        return { ok: false, errors: result.errors };
      }
      ctx.value = result.value;
    }

    if (anyErrors) {
      return { ok: false, errors };
    }
    return { ok: true, value: ctx.value };
  };
}
