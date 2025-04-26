import { useUtils } from "@/composables/useUtils";
import { describe, it, expect } from "vitest";

const { isDefined, getNestedProperty, hasOnlyNumbers } = useUtils();

describe("isDefined", () => {
  it("should return false for undefined, null, NaN, empty string, array and object", () => {
    expect(isDefined(undefined)).toBe(false);
    expect(isDefined(null)).toBe(false);
    expect(isDefined(NaN)).toBe(false);
    expect(isDefined("")).toBe(false);
    expect(isDefined([])).toBe(false);
    expect(isDefined({})).toBe(false);
  });

  it("should return true for non-empty values", () => {
    expect(isDefined("hello")).toBe(true);
    expect(isDefined([1, 2])).toBe(true);
    expect(isDefined({ key: "value" })).toBe(true);
    expect(isDefined(0)).toBe(true);
    expect(isDefined(false)).toBe(true);
  });
});

describe("getNestedProperty", () => {
  it("should return the correct value for a single-level key", () => {
    const obj = { a: 1, b: 2 };
    expect(getNestedProperty(obj, "a")).toBe(1);
    expect(getNestedProperty(obj, "b")).toBe(2);
  });

  it("should return undefined for a non-existent key", () => {
    const obj = { a: 1, b: 2 };
    expect(getNestedProperty(obj, "c")).toBeUndefined();
  });

  it("should return the correct value for a multi-level key", () => {
    const obj = { a: { b: { c: 1 } } };
    expect(getNestedProperty(obj, "a", "b")).toEqual({ c: 1 });
    expect(getNestedProperty(obj, "a", "b").c).toBe(1);
  });

  it("should return undefined if the second key doesn't exist in the nested object", () => {
    const obj = { a: { b: { c: 1 } } };
    expect(getNestedProperty(obj, "a", "d")).toBeUndefined();
  });
});

describe("hasOnlyNumbers", () => {
  it("should return true for valid numbers", () => {
    expect(hasOnlyNumbers("123")).toBe(true);
    expect(hasOnlyNumbers("123.45")).toBe(true);
    expect(hasOnlyNumbers("0")).toBe(true);
    expect(hasOnlyNumbers("0.1")).toBe(true);
  });

  it("should return false for invalid numbers", () => {
    expect(hasOnlyNumbers("abc")).toBe(false);
    expect(hasOnlyNumbers("123a")).toBe(false);
    expect(hasOnlyNumbers("123@")).toBe(false);
    expect(hasOnlyNumbers("123#45")).toBe(false);
    expect(hasOnlyNumbers(" 123 ")).toBe(false);
  });
});
