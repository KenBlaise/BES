# Crystal PM integration

Crystal PM is being **evaluated** as Blaze’s practice management / optical system. This document separates desire from confirmation.

## Desired capabilities

- Search patients
- Retrieve patient demographics
- Retrieve prescriptions
- Retrieve appointments
- Retrieve optical orders
- Optionally create / update patients, appointments, and optical orders
- Store an external Blaze ID if Crystal supports it

## Confirmed capabilities

None. This prototype does not connect to Crystal. No production FHIR, partner API, or write access has been verified.

## Unconfirmed capabilities

All write operations are **PENDING CRYSTAL API CAPABILITY CONFIRMATION**:

- `createPatient()`
- `updatePatient()`
- `createAppointment()`
- `updateAppointment()`
- `createOpticalOrder()`

Do **not** claim Crystal supports these until verified.

## Open questions

- Can Blaze search patients?
- Can Blaze retrieve patient demographics?
- Can Blaze create or update patients?
- Can Blaze retrieve prescriptions?
- Can Blaze retrieve, create, or update appointments?
- Can Blaze retrieve or create optical orders?
- Can external Blaze IDs be stored in Crystal?
- What authentication is used?
- Is production FHIR available?
- Does FHIR allow write operations?
- Is there a private / partner API?
- What agreements are required?
- Is a BAA available where applicable?

## Prototype mapping

`MockCrystalPMService` returns realistic mock data. Writes generate fake IDs such as `CRY-XXXXX` and attach them to **BlazeCustomer**, never directly to **MyBlazeAccount**.
