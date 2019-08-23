import { ValueValidator } from '../core';

/**
 * ModelDefinition is a type containing validators for all properties of a given
 * type.
 */
export type ModelDefinition<T> = { [K in keyof T]-?: ValueValidator<T[K]> };
