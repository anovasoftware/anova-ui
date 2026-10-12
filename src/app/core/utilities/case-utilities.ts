export class CaseUtility {

  static toSnakeCase<T>(value: unknown): T {
    if (Array.isArray(value)) {
      return value.map(item =>
        CaseUtility.toSnakeCase(item)
      ) as T;
    }

    if (value !== null && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [
          key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`),
          CaseUtility.toSnakeCase(val)
        ])
      ) as T;
    }

    return value as T;
  }

  static toCamelCase<T>(value: unknown): T {
    if (Array.isArray(value)) {
      return value.map(item =>
        CaseUtility.toCamelCase(item)
      ) as T;
    }

    if (value !== null && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [
          key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
          CaseUtility.toCamelCase(val)
        ])
      ) as T;
    }

    return value as T;
  }

}

