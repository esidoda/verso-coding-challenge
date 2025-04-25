export function useUtils() {
  function isObject(value: any): boolean {
    return value && typeof value === "object" && value.constructor === Object;
  }

  const isDefined = (
    value: any,
    treatEmptyStringAsDefined = false
  ): boolean => {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return false;
    }
    if (!treatEmptyStringAsDefined && value === "") {
      return false;
    }
    if (Array.isArray(value) && value.length <= 0) {
      return false;
    }
    if (isObject(value) && Object.keys(value).length === 0) {
      return false;
    }
    return true;
  };

  const hasOnlyNumbers = (value: string): boolean => {
    const regex = /^\d*\.?\d+$/;
    return regex.test(value);
  };

  const getNestedProperty = (
    obj: Record<string, any>,
    key1: string,
    key2?: string
  ) => {
    const val = obj?.[key1];
    return key2 ? val?.[key2] : val;
  };

  return { isDefined, hasOnlyNumbers, getNestedProperty };
}
