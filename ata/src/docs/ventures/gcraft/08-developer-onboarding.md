# Gcraft - Developer Onboarding

**Pages:** 25

## Setup

```bash
git clone https://github.com/gcraft/platform
cd platform
docker-compose up
```

## API Integration

```javascript
import Gcraft from '@gcraft/sdk';

const client = new Gcraft({ apiKey: 'gct_live_abc123' });

// List card for sale
const listing = await client.listings.create({
  brand: 'Starbucks',
  balance: 50.00,
  price: 42.00
});

// Search cards
const results = await client.listings.search({
  brand: 'amazon',
  min_discount: 10
});
```

**© 2025 Gcraft Inc.**
