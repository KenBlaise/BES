# Security principles

This application is a **prototype**. It is **not** HIPAA compliant and must not be treated as a production security implementation.

## Future production requirements

- HTTPS / TLS on every surface
- Encryption at rest for stored customer and optical data
- Server-side secrets only (never in client bundles)
- Role-based access enforced on the server
- Employee MFA
- Secure, httpOnly sessions
- Automatic employee session timeout
- Tamper-resistant audit logging
- Least privilege for staff roles
- Data minimization and minimum-necessary access
- Vendor BAAs where legally required
- Webhook signature validation for any vendor callbacks

## Do not place sensitive information in

- URLs
- Analytics events
- Browser console logs
- Git history
- Client-side source code or public environment variables

## Prototype reality

Authentication is mocked (`123456` customer OTP; staff email/password). Sessions persist in `localStorage` for demo continuity. Production authorization **must** be server-side.

Do not claim this prototype is HIPAA compliant.
