import { ValidationMode } from './ValidationMode';

/**
 * ValidationContext describes a value to be validated.
 */
export interface ValidationContext {
  field?: string;
  value: any;
  mode: ValidationMode;
}
