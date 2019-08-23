import { ModelDefinition } from './ModelDefinition';

/**
 * Define a model with property validation.
 */
export function model<T>(validation: ModelDefinition<T>): ModelDefinition<T> {
  return validation; // this is just a type helper.
}
