# Gcraft - API Documentation
## Marketplace REST API

**Last Updated:** November 30, 2025  
**Pages:** 25

---

## Base URL
`https://api.gcraft.io/v1`

## Authentication
```bash
curl -X POST https://api.gcraft.io/v1/auth/login \
  -d '{"email": "user@example.com", "password": "***"}'
```

## Endpoints

### List Card for Sale
```bash
POST /listings
{
  "brand": "Starbucks",
  "balance": 50.00,
  "price": 42.00,
  "card_number_encrypted": "***",
  "pin_encrypted": "***"
}
```

### Search Cards
```bash
GET /listings?brand=starbucks&min_discount=10
```

### Purchase Card
```bash
POST /purchases
{
  "listing_id": "lst_abc123",
  "payment_method": "card_xyz789"
}
```

**© 2025 Gcraft Inc. All rights reserved.**
