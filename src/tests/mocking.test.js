import { describe, vi, it, expect, beforeEach } from "vitest";
import { getPriceInCurrency, login, renderPage, signUp } from "../mocking";
import { getExchangeRate } from "../libs/currency";
import { trackPageView } from "../libs/analytics";
import { sendEmail } from "../libs/email";
import security from "../libs/security";

vi.mock("../libs/currency");
vi.mock("../libs/analytics");
vi.mock("../libs/email", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

/**
 * Mock function
 * A function that imitates the behavior of a real function
 */
describe("test suite", () => {
  it("test case", () => {
    const greet = vi.fn();
    // Mock return value
    // greet.mockReturnValue("Hi");

    // Mock resolved value
    // greet.mockResolvedValue("Hi");

    // Mock implementation
    greet.mockImplementation((name) => {
      return `Hi ${name}`;
    });

    const result = greet("Dinesh");

    expect(result).toBe("Hi Dinesh");
  });
});

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, "AUD");

    expect(price).toBe(15);
  });
});

describe("renderPage", () => {
  it("should render correct content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/);
  });

  it("should call analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

// Partial mocking
describe("signUp", () => {
  beforeEach(() => {
    // vi.mocked(sendEmail).mockClear();
    vi.clearAllMocks();
  });
  const email = "demo@gmail.com";
  it("should return true if the email is valid", async () => {
    const result = await signUp(email);
    expect(result).toBe(true);
  });

  it("should return false if the email is in valid", async () => {
    const result = await signUp("d");
    expect(result).toBe(false);
  });

  it("should send welcome email if the email is valid", async () => {
    const result = await signUp(email);
    expect(sendEmail).toHaveBeenCalled();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });

  /**
   * Spying
   * To monitor the behavior of the function during the execution
   */
  describe("login", () => {
    it("should email the one-time login code", async () => {
      const email = "name@domain.com";
      const generateCodeSpy = vi.spyOn(security, "generateCode");

      await login(email);

      const securityCode = generateCodeSpy.mock.results[0].value.toString();

      expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
    });
  });
});
