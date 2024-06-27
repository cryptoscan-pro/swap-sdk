# @cryptoscan/swap-sdk

The fastest way to swap any tokens on any networks & dexes

To install package:

```bash
npm install @cryptoscan/swap-sdk
```

User-Experience Usage

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { swap } from '@cryptoscan/swap-sdk';

const secretKeyStr = 'YOUR_SECRET_KEY';
const wallet = getWallet(secretKeyStr);
const from = 'sol';
const to = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const amount = 0.05;

swap({
  wallet,
  from,
  to,
  amount,
})
.then((tx) => console.log(tx))
```

Primary Usage

```javascript
import { Keypair, Connection } from "@solana/web3.js";
import { createSwapTransaction } from '@cryptoscan/swap-sdk';

const rpcUrl = 'https://api.mainnet-beta.solana.com';
const secretKeyStr = 'YOUR_SECRET_KEY';
const wallet = Keypair.fromSecretKey(bs58.decode(secretKeyStr));
const from = 'sol';
const to = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const amount = 0.05;

async function swap() {
  const connection = new Connection(rpcUrl);
  const transaction = await createSwapTransaction({
    wallet,
    from,
    to,
    amount,
    connection,
  });

  transaction.sign([wallet]);

  return connection.sendTransaction(transaction);
}

swap().then((tx) => console.log(tx));
```

## Docs

- `wallet` - Keypair of the wallet
- `from` - Coin address to pay (Defaults: `sol`)
- `to` - Coin address to buy
- `amount` - Amount of Coin `from` to buy
- `connection` - Solana connection (Defaults: `Mainnet Solana Connection`)

## Deploy

To install dependencies:

```bash
npm install
```

To build:

```bash
npm build
```

This project was created using `bun init` in bun v1.1.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
