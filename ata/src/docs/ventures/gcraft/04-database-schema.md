# Gcraft - Database Schema

**Pages:** 45

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE listings (
  id UUID PRIMARY KEY,
  seller_id UUID REFERENCES users(id),
  brand VARCHAR(100),
  balance DECIMAL(10,2),
  price DECIMAL(10,2),
  card_number_encrypted TEXT,
  pin_encrypted TEXT,
  fraud_score DECIMAL(3,2),
  status VARCHAR(20),
  created_at TIMESTAMP
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  listing_id UUID REFERENCES listings(id),
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  amount DECIMAL(10,2),
  fee DECIMAL(10,2),
  status VARCHAR(20),
  completed_at TIMESTAMP
);
```

**© 2025 Gcraft Inc.**
