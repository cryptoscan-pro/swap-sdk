# @cryptoscan/swap-sdk

The fastest way to swap any tokens on any networks & dexes

[[GitHub]](https://github.com/cryptoscan-pro/swap-sdk)
[[Our website]](https://cryptoscan.pro/)
[[Docs]](https://cryptoscan.pro/docs/swap-sdk)
[[Discord]](https://discord.gg/ktewAs67fE)

## Supported networks

- [x] Solana

Networks are planned to support: [https://api.cryptoscan.pro/v1/networks](https://api.cryptoscan.pro/v1/networks)

## Get started

To install package:

```bash
npm install @cryptoscan/swap-sdk
```

Easy-To-Use Example

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
import sendTransaction from '@cryptoscan/solana-send-transaction';
import { createTransaction } from '@cryptoscan/swap-sdk';

const rpcUrl = 'https://api.mainnet-beta.solana.com';
const wsRpcUrl = 'wss://api.mainnet-beta.solana.com';
const secretKeyStr = 'YOUR_SECRET_KEY';
const wallet = Keypair.fromSecretKey(bs58.decode(secretKeyStr));
const from = 'sol';
const to = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const amount = 0.05;

async function swap() {
  const connection = new Connection(rpcUrl, {
    wsEndpoint: wsRpcUrl,
  })
  const transaction = await createTransaction({
    walletAddress: wallet.publicKey.toString(),
    from,
    to,
    amount,
  });

  if (transaction instanceof Error) {
    return transaction;
  }

  transaction.sign([wallet]);

  return sendTransaction(transaction, { connection }) // The fast Cryptoscan method
  // return connection.sendTransaction(transaction); // Solana SDK Method
}

swap().then((tx) => console.log(tx));
```

## Swap Docs

- `wallet` - Keypair of the wallet
- `from` - Coin address to pay (Defaults: `sol`)
- `service` - Platform to buy (Optional: auto-detecting)
- `to` - Coin address to buy
- `amount` - Amount of Coin `from` to buy
- `fee` - Transaction fee (Optional)
- `priorityFee` - Priority fee (Default: 0.0001)
- `slippage` - Slippage (Default: 1)

## FAQ

<details>
  <summary>Is it secure to use sdk with private key?</summary>

  Yes. You don't share private key through api request.
  You sign transaction with private key locally only.
</details>
<details>
  <summary>Is it free?</summary>

  We charge a 0.39% fee on each successful transaction instruction. 
  If you want to decrease fee - please contact us in [discord](https://discord.gg/ktewAs67fE) or [telegram](https://t.me/daniil_jave)
  We can increase fee down to 0.1% if you will contribute us.
</details>
<details>
  <summary>How to contribute?</summary>

  You can create pull requests or make a project based on our packages. 
  You have chance to get some supply for a work and get fee reduced for the api.
</details>

## Contribute

To install dependencies:

```bash
npm install
```

To build:

```bash
npm build
```
