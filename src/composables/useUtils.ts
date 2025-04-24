export function useUtils() {
  function isObject(value: any): boolean {
    return value && typeof value === "object" && value.constructor === Object;
  }

  function isDefined(value: any, treatEmptyStringAsDefined = false): boolean {
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
  }

  function hasOnlyNumbers(value: string): boolean {
    const regex = /^\d*\.?\d+$/;
    return regex.test(value);
  }

  return { isDefined, hasOnlyNumbers };
}
