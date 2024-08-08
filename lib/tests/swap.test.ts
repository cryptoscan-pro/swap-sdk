import { describe, test, expect } from 'vitest';
import { Connection, VersionedTransaction } from '@solana/web3.js';
import { createTransaction } from '../utils/createTransaction.js';

describe('swap', () => {
	test('should simulate a solana swap', async () => {
		const connection = new Connection('https://api.mainnet-beta.solana.com');
		const transaction = await createTransaction({
      network: "solana",
      from: "So11111111111111111111111111111111111111112",
      to: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amount: 1,
			walletAddress: 'Hvt7wmdSEyDfptyojo4iiS3sroTPKAeKMAc4PNzXg7Ds',
		})

		const result = await connection.simulateTransaction(transaction);
    const hasError = result.value.err && !(result.value.err as any).InstructionError;

		expect(result).toBeDefined()
    expect(hasError).toBeFalsy();
	}, 10_000)

	test('should simulate a pumpfun swap', async () => {
		const connection = new Connection('https://api.mainnet-beta.solana.com');
		const transaction = await createTransaction({
      network: "solana",
      from: "So11111111111111111111111111111111111111112",
      to: "HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump",
      amount: 1,
			walletAddress: 'Hvt7wmdSEyDfptyojo4iiS3sroTPKAeKMAc4PNzXg7Ds',
		})

		const result = await connection.simulateTransaction(transaction);
    const hasError = result.value.err && !(result.value.err as any).InstructionError;

		expect(result).toBeDefined()
    expect(hasError).toBeFalsy();
	}, 10_000)
})
