# Validation

Validates objects, optionally coercing values into other types.

## Usage

Validators and types are all exported from the root:

```js
import { any, text } from '@fmtk/validation';
```

Validators are functions which return a function which actually does the validation.

```js
// require a string
const validator = text();

const result = validator({ value: 'foo' });
```

Most likely, you'll want to validate whole objects:

```js
const personValidator = properties({
  name: text(),
  age: optional(integer()),
  dateOfBirth: dateFormat('YYYY-MM-DD'),
});

personValidator({
  value: { name: 'Bob', age: '5', dateOfBirth: '2013-12-05' },
  mode: ValidationMode.String,
});
// ===> {
//    value: {
//      name: 'Bob',
//      age: 5,
//      dateOfBirth: new Date('2013-12-05T00:00:00.000')
//    },
//    ok: true
//  }

personValidator({ value: { name: 'Bob' } });
// ===> {
//    value: { name: 'Bob' },
//    errors: [
//      {
//        id: 'EXPECTED_DATE_FORMAT',
//        text: 'expected a date',
//        field: 'dateOfBirth'
//      }
//    ]
// }
```

## Validators

The library defines validators for various data types and formats.

All validators return an implementation of `ValueValidator`, i.e., a function
that takes a `ValidationContext` as its only parameter, and returns a `ValidationResult`.

### `ValidationContext`

Properties:

| field | description                                                                   |
| ----- | ----------------------------------------------------------------------------- |
| value | the value to validate                                                         |
| field | the name of the field under validation (for `properties` or `modelValidator`) |
| mode  | the validation mode                                                           |

### `ValidationMode`

```typescript
enum ValidationMode {
  Strict = 'strict',
  JSON = 'json',
  Form = 'form',
  String = 'string',
}
```

### `ValidationResult`

| field  | description                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------ |
| value  | the value after validation - allows values to be coerced, e.g., `integer()` turns `'1'` into `1` |
| errors | an array of `ValidationError` if there are any                                                   |

### `ValidationError`

| field   | description                                   |
| ------- | --------------------------------------------- |
| `id`    | the error ID                                  |
| `text`  | the error message                             |
| `field` | the field the error relates to, if applicable |
| `extra` | any extra info, if applicable                 |

### `any()`

Don't perform validation. This will accept any input and never return an error.

### `array(element: ValueValidator<T>, arraySplit?: string)`

Expect the value to be an array.

**Params:**

| field      | description                                        |
| ---------- | -------------------------------------------------- |
| elem       | a validator to validate each element in the array  |
| arraySplit | the character to split a string on (default `','`) |

If `ValidationOptions.parse` is `true`, the validator will first create an array from the input by splitting by `arraySplit`.

### `bool()`

Require a boolean value.

If `ValidationOptions.parse` is `true`, the string values `true` and `false` are accepted.

### `or(...validators: ValueValidator<T>)`

Creates a validator that requires at least one of the supplied validators to be valid.

### `and(...validators: ValueValidator<T>)`

Creates a validator that requries all supplied validators to be valid.

### `dateFormat(format: string | moment.MomentBuiltinFormat)`

Validates a date/time against the given format.

The `format` argument is only relevant if If `ValidationOptions.parse` is `true`, and the input is a string. In this case, it will parse the string with `moment` and the given format.

If the input is a `Date` it is always valid, regardless of the format.

### `email()`

Require an email address.

Expects a string to match the following regex: `/^[^@]+@[^@]+$/`

### `integer()`

Require an integer value.

If `ValidationOptions.parse` is `true` the number is parsed from a string if applicable.

### `is(...values: T[])`

Require one of a list of values.

### `notProvided(opts: {string?: boolean})`

Require a value not to be present.

### `optional(validator: ValueValiator<T>)`

Make a value optional.

### `password(minScore = 3)`

Validate a password against a complexity score.

`minScore` shoul dbe between 0 and 4 inclusive.

### `real()`

Require a real value (floating point).

If `ValidationOptions.parse` is `true`, the number is parsed from a string if applicable.

### `text(maxLength?: number, minLength=1)`

Require a text value.

### `ukmobile()`

Validates a string as a UK mobile number, coercing it to E.164 format.

### `properties(model: ModelDefinition<T>, allowExtraFields=false)`

Validates an object, taking a hash which describes the fields. E.g.:

```js
properties({
  name: text(),
  age: optional(integer()),
});
```
