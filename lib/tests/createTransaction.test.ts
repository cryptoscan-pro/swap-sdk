import { describe, test, expect } from 'vitest';
import { createTransaction } from '../utils/createTransaction.js';

describe('createTransaction', () => {
	test('should create a solana transfer transaction txn', async () => {
		const transaction = await createTransaction({
			type: 'transfer',
      network: "solana",
			coinAddress: 'So11111111111111111111111111111111111111112',
      from: "Hvt7wmdSEyDfptyojo4iiS3sroTPKAeKMAc4PNzXg7Ds",
      to: "DggKFxSoev2xJfMeb1CvgXZ8BsDUXb54bhFtaVMUT9nU",
      amount: 1,
		})

		expect(transaction).toBeDefined();
	}, 10_000)


	test('should create a solana transfer transaction txn', async () => {
		await new Promise(resolve => setTimeout(resolve, 2_000));
		const transaction = await createTransaction({
			type: 'transfer',
      network: "solana",
			coinAddress: 'So11111111111111111111111111111111111111112',
      from: "Hvt7wmdSEyDfptyojo4iiS3sroTPKAeKMAc4PNzXg7Ds",
      to: "DggKFxSoev2xJfMeb1CvgXZ8BsDUXb54bhFtaVMUT9nU",
      amount: 1,
		})

		expect(transaction).toBeDefined();
	}, 12_000)


	test('should create a solana swap transaction txn', async () => {
		await new Promise(resolve => setTimeout(resolve, 4_000));
		const transaction = await createTransaction({
      network: "solana",
      from: "So11111111111111111111111111111111111111112",
      to: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amount: 1,
			walletAddress: '11111111111111111111111111111111',
		})

		expect(transaction).toBeDefined();
	}, 14_000)

	test('should create a pumpfun transaction txn', async () => {
		await new Promise(resolve => setTimeout(resolve, 6_000));
		const transaction = await createTransaction({
      network: "solana",
			service: "pumpfun",
      from: "So11111111111111111111111111111111111111112",
      to: "HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump",
      amount: 1,
			walletAddress: '11111111111111111111111111111111',
		})

		expect(transaction).toBeDefined();
	}, 16_000)
})
