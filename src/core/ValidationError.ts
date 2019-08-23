/**
 * ValidationError represents an error occuring during validation.
 */
export interface ValidationError {
  text: string; // textual description
  id: string; // programmatic identifier
  field?: string; // field name
  extra?: any; // extra info
}
