import { UnexpectedField } from './notProvided';
import { joinIds } from '../util';
import { ValidationContext, ValidationError, ValueValidator } from '../core';
import { ModelDefinition } from '../util/ModelDefinition';

export const ExpectedObject = 'EXPECTED_OBJECT';

export type PropertyValidation<T> =
  | ModelDefinition<T>
  | ((value: T) => ModelDefinition<T>);

/**
 * Validate the properties of an object using the validators provided.
 */
export function properties<T>(
  model: PropertyValidation<T>,
  allowExtraFields?: boolean,
): ValueValidator<T> {
  return ({ value, field, mode }) => {
    if (typeof value !== 'object') {
      return {
        ok: false,
        errors: [
          {
            id: ExpectedObject,
            text: `expected object`,
            field,
          },
        ],
      };
    }

    // we copy the value here so that partial validators will still have all
    // of the properties, but need to clone it so that parsed[key] later
    // doesn't mutate the input value
    const parsed = { ...value };

    let anyErrors = false;
    const errors: ValidationError[] = [];

    if (typeof model === 'function') {
      model = model(value);
    }

    // check all properties validation
    for (let key in model) {
      const validator = model[key];
      const exists = key in value;

      const propCtx: ValidationContext = {
        field: joinIds(field || '', key),
        value: value[key],
        mode,
      };

      // validate
      const propResult = validator(propCtx);

      if (!propResult.ok) {
        anyErrors = true;
        errors.push(...propResult.errors);
      } else if (exists || typeof propResult.value !== 'undefined') {
        // don't just make an explicit undefined prop
        parsed[key] = propResult.value;
      }
    }

    // check for extra fields
    if (!allowExtraFields) {
      for (let key in value) {
        if (!(key in model)) {
          errors.push({
            id: UnexpectedField,
            text: 'unexpected value',
            field: key,
          });
        }
      }
    }

    if (anyErrors) {
      return { ok: false, errors };
    } else {
      return { ok: true, value: parsed };
    }
  };
}
