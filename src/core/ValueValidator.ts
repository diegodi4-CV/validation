import { ValidationContext } from './ValidationContext';
import { ValidationResult } from './ValidationResult';

/**
 * ValueValidator is a function which validates a value and returns an error
 * object or undefined if no error found.
 */
export type ValueValidator<T> = (
  value: ValidationContext,
) => ValidationResult<T>;
