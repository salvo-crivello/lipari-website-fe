/**
 * Recursively makes all properties of a type optional, including nested objects.
 *
 * @typeParam T - The type to make deeply optional.
 */
export type TDeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: TDeepPartial<T[K]>
    }
  : T
