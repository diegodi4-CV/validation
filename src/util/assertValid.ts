import { ValueValidator, ValidationMode, ModelValidationError } from '../core';

/**
 * Wrap a validate call to throw an error if validation errors found.
 */
export function assertValid<T>(
  value: T,
  validator: ValueValidator<T>,
  options?: { field?: string; mode?: ValidationMode },
): T {
  const { field = undefined, mode = ValidationMode.Strict } = options || {};
  const result = validator({ value: <T>value, field, mode });

  if (!result.ok) {
    throw new ModelValidationError(result.errors);
  }

  return result.value;
}
