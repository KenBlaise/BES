# Anagram integration

Anagram is the desired insurance benefits engine. All methods in this prototype return mock data. Do not use real API credentials.

## Intended architecture

```
Employee
  → verified customer
  → Crystal demographics (minimum required fields)
  → Blaze server
  → Anagram
  → eligibility / benefits
  → Blaze Staff UI
  → order builder
```

`mapCrystalPatientToAnagramEligibilityRequest()` lives in `/lib/mappers` — not in React components.

## Staff initiated only

**ANAGRAM ELIGIBILITY IS STAFF INITIATED ONLY.**

- No public eligibility checker
- No customer My Blaze eligibility checker
- No “check benefits / refresh benefits” on the public site

Benefits verification is part of the Blaze purchasing experience so Blaze does not become a free lookup service for purchases made elsewhere.

## Customer view

Connected customers may see a simplified **purchase-related** summary (carrier, date verified by Blaze, order, amount applied). They never see raw Anagram payloads, payer IDs, or eligibility IDs.
