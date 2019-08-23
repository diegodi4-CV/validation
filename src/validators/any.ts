import { ValueValidator } from '../core';

/**
 * Don't perform validation.
 */
export function any(): ValueValidator<any> {
  return ({ value }) => ({ ok: true, value });
}
