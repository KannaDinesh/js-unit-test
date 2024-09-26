import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { canDrive, fetchData } from "../core";

describe("canDrive", () => {
  // Positive testing
  it("should return true for eligible age in US", () => {
    expect(canDrive(16, "US")).toBe(true);
  });

  it("should return true for eligible age in UK", () => {
    expect(canDrive(17, "UK")).toBe(true);
  });

  // Negative testing
  it("Should throw error for invalid country code", () => {
    expect(canDrive(0, "UAE")).toMatch("Invalid");
  });

  //   Boundary testing
  it("should return false for eligible age in US", () => {
    expect(canDrive(15, "US")).toBe(false);
  });

  it("should return false for eligible age in UK", () => {
    expect(canDrive(16, "UK")).toBe(false);
  });

  //   Parameterized testing
  it.each([
    { age: 16, country: "US", result: true },
    { age: 17, country: "UK", result: true },
    { age: 15, country: "US", result: false },
    { age: 16, country: "UK", result: false },
  ])("should return $result for $age, $country", ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });
});

// Asynchronous testing
describe("fetchData", () => {
  it("should return an array of numbers in resolved state", async () => {
    // Method 1
    // fetchData()
    //   .then((result) => {
    //     expect(Array.isArray(result)).toBe(true);
    //     expect(result.length).toBeGreaterThan(0);
    //   })
    //   .catch((error) => {
    //     expect(error.message).toMatch(/error/i);
    //   });

    // Method 2
    try {
      const result = await fetchData();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toHaveProperty("reason");
    }
  });

  describe("test suite", () => {
    beforeEach(() => {
      console.log("Before each called");
    });

    afterEach(() => {
      console.log("After each called");
    });

    beforeAll(() => {
      console.log("Before all called");
    });

    afterAll(() => {
      console.log("After all called");
    });

    it("Test case 1", () => {});

    it("Test case 2", () => {});
  });
});
