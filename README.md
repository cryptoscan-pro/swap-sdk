# @cryptoscan/swap-sdk

The fastest way to swap any tokens on any networks & dexes

[\[GitHub\]](https://github.com/cryptoscan-pro/swap-sdk)

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
import { createSwapTransaction, sendTransaction } from '@cryptoscan/swap-sdk';

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

  return sendTransaction(transaction) // The fast Cryptoscan method
  // return connection.sendTransaction(transaction); // Solana SDK Method
}

swap().then((tx) => console.log(tx));
```

## Swap Docs

- `wallet` - Keypair of the wallet
- `from` - Coin address to pay (Defaults: `sol`)
- `to` - Coin address to buy
- `amount` - Amount of Coin `from` to buy
- `connection` - Solana connection (Defaults: `Mainnet Solana Connection`)

## Transfer Example

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { Connection } from "@solana/web3.js";
import { createTransaction, sendTransaction } from '@cryptoscan/swap-sdk';

const rpcUrl = 'https://api.mainnet-beta.solana.com';
const secretKeyStr = 'YOUR_SECRET_KEY';
const wallet = getWallet(secretKeyStr);
const from = wallet.publicKey.toString();
const to = '4YH9p2SFQwZmAL2CCpfQRCvnx8qZ5K6PHdHY1ED1a53m';
const sol = 0.05;

async function transfer() {
  const connection = new Connection(rpcUrl);
  const transaction = await createTransaction({
    payerAddress: wallet.publicKey.toString(),
    instructions: [
      { type: 'transfer', fromAddress, toAddress, sol },
    ]
  });

  transaction.sign([wallet]);

  return sendTransaction(transaction)
}

transfer().then((tx) => console.log(tx));
```

## Multi Sell Example

Sell all tokens balance by some wallets

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { Connection } from "@solana/web3.js";
import { createTransaction, sendTransaction } from '@cryptoscan/swap-sdk';

const rpcUrl = 'https://api.mainnet-beta.solana.com';
const secretKeyStr = 'YOUR_SECRET_KEY';
const wallet = getWallet(secretKeyStr);
const walletAddress = wallet.publicKey.toString();
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';

async function sell() {
  const connection = new Connection(rpcUrl);
  const transaction = await createTransaction({
    payerAddress: walletAddress,
    instructions: [
      { 
        type: 'sell', 
        service: 'pumpfun', 
        coinAddress,
        walletAddress: 'WALLET_ADDRESS_1',
        slippage: 10,
      },
      { 
        type: 'sell', 
        service: 'pumpfun', 
        coinAddress,
        walletAddress: 'WALLET_ADDRESS_2',
        slippage: 10,
      },
    ]
  });

  transaction.sign([wallet]);

  return sendTransaction(transaction)
}

sell().then((tx) => console.log(tx));
```

## Fast Transfer & Buy Example

Transfer solana and buy in one transaction

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { Connection } from "@solana/web3.js";
import { createTransaction, sendTransaction } from '@cryptoscan/swap-sdk';

const rpcUrl = 'https://api.mainnet-beta.solana.com';
const wallet = getWallet('YOUR_SECRET_KEY');
const walletAddress = wallet.publicKey.toString();
const buyerWallet = getWallet('YOUR_BUYER_SECRET_KEY');
const buyerWalletAddress = buyerWallet.publicKey.toString();
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const sol = 0.05;

async function buy() {
  const connection = new Connection(rpcUrl);
  const transaction = await createTransaction({
    payerAddress: walletAddress,
    instructions: [
      {
        type: 'transfer',
        sol,
        fromAddress: walletAddress,
        toAddress: buyerWalletAddress,
      },
      { 
        type: 'buy', 
        service: 'pumpfun', 
        coinAddress,
        walletAddress: buyerWalletAddress,
        sol,
        slippage: 10,
      },
    ]
  });

  transaction.sign([wallet, buyerWallet]);

  return sendTransaction(transaction)
}

buy().then((tx) => console.log(tx));
```

## Create Account & Buy Example

You need to create associated account manually and then buy a coin
If you using `swap` method, you dont need this

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { Connection } from "@solana/web3.js";
import { createTransaction, sendTransaction } from '@cryptoscan/swap-sdk';

const rpcUrl = 'https://api.mainnet-beta.solana.com';
const wallet = getWallet('YOUR_SECRET_KEY');
const walletAddress = wallet.publicKey.toString();
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const buyerWallet = getWallet('YOUR_BUYER_SECRET_KEY');
const buyerWalletAddress = buyerWallet.publicKey.toString();
const sol = 0.05;

async function buy() {
  const connection = new Connection(rpcUrl);
  const transaction = await createTransaction({
    payerAddress: walletAddress,
    instructions: [
      {
        type: 'createAccount', 
        payerAddress: walletAddress,
        walletAddress: buyerWalletAddress,
        coinAddress,
      }
      { 
        type: 'buy', 
        service: 'pumpfun', 
        coinAddress,
        walletAddress: buyerWalletAddress,
        sol,
        slippage: 10,
      },
    ]
  });

  transaction.sign([wallet, buyerWallet]);

  return sendTransaction(transaction)
}

buy().then((tx) => console.log(tx));
```

## Fixed fee Example

Make transactions with fixed fee

- `budgetLimit` - Limit of sol fee in one transaction
- `budgetPrice` - Price of transaction per cognitive unit

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { Connection } from "@solana/web3.js";
import { createTransaction, sendTransaction } from '@cryptoscan/swap-sdk';

const rpcUrl = 'https://api.mainnet-beta.solana.com';
const wallet = getWallet('YOUR_SECRET_KEY');
const walletAddress = wallet.publicKey.toString();
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const sol = 0.05;

async function buy() {
  const connection = new Connection(rpcUrl);
  const transaction = await createTransaction({
    payerAddress: walletAddress,
    instructions: [
      {
        type: 'budgetLimit',
        sol: 0.01,
      },
      {
        type: 'budgetPrice',
        sol: 0.0001,
      },
      { 
        type: 'buy', 
        service: 'pumpfun', 
        coinAddress,
        walletAddress,
        sol,
        slippage: 10,
      },
    ]
  });

  transaction.sign([wallet]);

  return sendTransaction(transaction)
}

buy().then((tx) => console.log(tx));
```

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
