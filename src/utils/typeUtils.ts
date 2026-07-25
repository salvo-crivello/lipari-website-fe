/** Recursively makes every property of T optional. */
export type TDeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: TDeepPartial<T[K]>;
    }
  : T;
