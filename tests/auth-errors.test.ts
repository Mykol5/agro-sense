import { describe, expect, it } from "vitest";
import {
  getLoginErrorMessage,
  getSignupErrorMessage,
} from "../lib/auth-errors";

describe("getSignupErrorMessage", () => {
  it("returns the required duplicate-account message", () => {
    expect(
      getSignupErrorMessage("user_already_exists")
    ).toBe("That account already exists. Sign in instead.");
  });

  it("handles email_exists", () => {
    expect(
      getSignupErrorMessage("email_exists")
    ).toBe("That account already exists. Sign in instead.");
  });

  it("handles invalid email", () => {
    expect(
      getSignupErrorMessage("email_address_invalid")
    ).toBe("Please enter a valid email address.");
  });

  it("handles weak passwords", () => {
    expect(
      getSignupErrorMessage("weak_password")
    ).toBe(
      "Your password is too weak. Please choose a stronger password."
    );
  });

  it("handles rate limiting", () => {
    expect(
      getSignupErrorMessage("over_request_rate_limit")
    ).toBe(
      "Too many requests. Please wait a few minutes and try again."
    );
  });

  it("uses a safe fallback for unknown errors", () => {
    expect(
      getSignupErrorMessage("some_future_error")
    ).toBe("We couldn't create your account. Please try again.");
  });
});

describe("getLoginErrorMessage", () => {
  it("does not reveal account existence for invalid credentials", () => {
    expect(
      getLoginErrorMessage("invalid_credentials")
    ).toBe(
      "The email or password you entered is incorrect."
    );
  });

  it("handles unconfirmed email honestly", () => {
    expect(
      getLoginErrorMessage("email_not_confirmed")
    ).toBe(
      "Please confirm your email address before signing in."
    );
  });

  it("handles rate limiting separately", () => {
    expect(
      getLoginErrorMessage("over_request_rate_limit")
    ).toBe(
      "Too many sign-in attempts. Please wait a few minutes and try again."
    );
  });

  it("uses a safe fallback for unknown errors", () => {
    expect(
      getLoginErrorMessage("some_future_error")
    ).toBe("We couldn't sign you in. Please try again.");
  });
});