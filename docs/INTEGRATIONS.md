# Integrations

Blaze is the experience layer. Customers should never feel transferred between vendors.

## How the pieces relate

These are **not** one database.

| Layer | Role |
| --- | --- |
| **My Blaze** | Retail identity and personalization (favorites, style, recently viewed) |
| **Blaze Customer** | Actual retail / optical relationship with the studio |
| **Crystal PM** | Evaluated practice-management / optical system |
| **Anagram** | Evaluated vision eligibility / benefits / claims engine |
| **Cherry Optical** | Evaluated prescription lens lab / fulfillment |

```
Customer → Blaze website / My Blaze → Blaze secure backend
                                         → Blaze database
                                         → Crystal PM
                                         → Anagram
                                         → Cherry Optical
                                         → Auth provider
```

Employees work in **Blaze Staff**. Vendor names stay behind Blaze on the customer side.

## Credentials

Configure future keys only via environment variables. See `.env.example`. Never commit real credentials.
