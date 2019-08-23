import { ValidationError } from './ValidationError';

/**
 * ValidationResult describes the result from a validation operation.
 */
export type ValidationResult<T> =
  | {
      ok: false;
      errors: ValidationError[];
    }
  | {
      ok: true;
      value: T;
    };
