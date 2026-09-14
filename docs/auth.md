# AgroSense Authentication

## GT-002 authentication contract

AgroSense uses Supabase Auth with email/password authentication.

For GT-002, email confirmation is disabled.

This is intentional because the Farmer Account acceptance criteria require a
new farmer to create an account and be signed in immediately in the same flow.

With email confirmation disabled, Supabase returns both:

- `user`
- `session`

from `auth.signUp()`.

The application requires both values before considering signup successful.

## Duplicate accounts

Duplicate signup errors are handled using Supabase Auth error codes rather
than matching human-readable error messages.

The required duplicate-account message is:

> That account already exists. Sign in instead.

## Authentication errors

The application does not expose raw Supabase authentication errors to farmers.

User-facing messages are mapped from stable Supabase Auth error codes in:

`lib/auth-errors.ts`