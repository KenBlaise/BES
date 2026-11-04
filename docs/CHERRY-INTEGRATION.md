# Cherry Optical integration

Cherry Optical is being **evaluated** as Blaze’s prescription lens lab.

## Desired future capabilities

- Submit an Rx lens order
- Associate a Blaze order ID
- Retrieve a lab job ID
- Retrieve production status
- Retrieve shipment status
- Retrieve tracking

## Status

**PENDING VENDOR CONFIRMATION / PENDING CHERRY INTEGRATION CAPABILITY CONFIRMATION**

`MockCherryOpticalService` methods (`createLabOrder`, `getLabOrder`, `getLabOrderStatus`, `getShipmentTracking`) are **desired Blaze abstractions**. They are **not** confirmed Cherry public APIs.

Do not represent these method names as Cherry’s real interface.

Customers never see lab jargon. Lab statuses map through `labStatusToBlazeStatus()` into Blaze-friendly tracking language.
