import { describe, test, expect } from 'vitest';
import { Connection, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import sendTransaction from '@cryptoscan/solana-send-transaction';
import { createTransaction } from '../utils/createTransaction.js';

describe('swap', () => {
	test('should send transaction with private rpc', async () => {
		const connection = new Connection(process.env.CONNECTION_URL!, {
			wsEndpoint: process.env.WS_CONNECTION_URL!,
		});
    const secretKey = bs58.decode(process.env.TEST_SECRET_KEY!);
    const wallet = Keypair.fromSecretKey(secretKey);
		const transaction = await createTransaction({
      network: "solana",
      from: "So11111111111111111111111111111111111111112",
      to: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amount: 0.002,
			walletAddress: wallet.publicKey.toString(),
		})
		
		transaction.sign([wallet]);

		const txid = await sendTransaction(transaction, {
			connection,
			checkBlockHeight: false,
			speed: 'fast',
		});

		console.log('sent', txid);

		expect(txid).toBeDefined()
		expect(typeof txid).toBe('string')
	}, 60_000)
})
