export function getSignupErrorMessage(
  code: string | undefined
): string {
  switch (code) {
    case "user_already_exists":
    case "email_exists":
      return "That account already exists. Sign in instead.";

    case "email_address_invalid":
      return "Please enter a valid email address.";

    case "weak_password":
      return "Your password is too weak. Please choose a stronger password.";

    case "email_provider_disabled":
      return "Email signups are currently unavailable. Please try again later.";

    case "over_email_send_rate_limit":
      return "Too many signup attempts. Please wait a while and try again.";

    case "over_request_rate_limit":
      return "Too many requests. Please wait a few minutes and try again.";

    default:
      return "We couldn't create your account. Please try again.";
  }
}

export function getLoginErrorMessage(
  code: string | undefined
): string {
  switch (code) {
    case "invalid_credentials":
      return "The email or password you entered is incorrect.";

    case "email_not_confirmed":
      return "Please confirm your email address before signing in.";

    case "user_banned":
      return "This account is currently unavailable.";

    case "over_request_rate_limit":
      return "Too many sign-in attempts. Please wait a few minutes and try again.";

    case "over_email_send_rate_limit":
      return "Too many attempts. Please wait a while and try again.";

    default:
      return "We couldn't sign you in. Please try again.";
  }
}