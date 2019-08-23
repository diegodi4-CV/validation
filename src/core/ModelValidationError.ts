import { ValidationError } from './ValidationError';

/**
 * ModelValidationError occurs when validation fails.
 */
export class ModelValidationError extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super('validation failed');
  }
}
