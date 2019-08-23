import { ValueValidator } from '../core';

/**
 * Make a value optional.
 */
export function optional<T>(
  validator?: ValueValidator<T>,
): ValueValidator<T | undefined> {
  return ctx => {
    if (ctx.value != undefined && <any>ctx.value !== '' && validator) {
      return validator(<any>ctx);
    }
    return { value: undefined, ok: true };
  };
}
