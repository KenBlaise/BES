# Privacy architecture

Blaze intentionally separates **retail personalization** from **optical / customer data**.

## Retail personalization (MyBlazeAccount)

A person can heart frames without becoming a patient.

Collected for the prototype:

- Account ID
- First name
- Email
- Optional phone
- Saved frames
- Style profile
- Favorite colors / shapes / brands
- Recently viewed
- Find Your Blaze results

Creating My Blaze does **not** require date of birth, prescription, insurance, or clinical history.

Email/phone are still personal information. This is **minimal account PII**, not “zero PII.”

## Optical / customer data (BlazeCustomer and vendors)

Only after a real studio relationship:

- Date of birth
- Address
- Prescription
- Insurance / benefits
- Appointments
- Optical orders

## Entity separation

```
MyBlazeAccount  --optional-->  BlazeCustomer  --optional-->  Crystal Patient
                                              --optional-->  Anagram Patient
                                              --optional-->  BlazeOrder
                                              --optional-->  Cherry lab order
```

Jordan (`MB-22391`) is a valid retail-only member with no Crystal, Anagram, prescription, or insurance record.

## Data minimization

- Do not copy an entire Crystal patient record into the Blaze database because an API returned it.
- Prefer Crystal → Blaze secure server → required fields → Anagram when Blaze does not need permanent storage.
- Persist only what Blaze needs for experience, orders, relationships, operations, audit, or required records.
