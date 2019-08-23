/**
 * Get the keys of a model.
 */
export function modelKeys<T>(model: T): (keyof T)[] {
  return Object.keys(model) as any;
}
