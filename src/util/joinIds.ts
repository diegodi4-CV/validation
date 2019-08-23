/**
 * Join dot-seperated identifier components.
 */
export function joinIds(first: string | undefined, ...ids: string[]): string {
  return [first, ...ids].filter(x => !!x).join('.');
}
