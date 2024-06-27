import { describe, test, expect } from 'bun:test';
import { createTransaction } from '../utils/createTransaction';

describe('createTransaction', () => {
  test('should create transaction', async () => {
    const transaction = await createTransaction({
      payerAddress: 'DggKFxSoev2xJfMeb1CvgXZ8BsDUXb54bhFtaVMUT9nU',
      instructions: [
        { 
          type: 'transfer',
          fromAddress: 'DggKFxSoev2xJfMeb1CvgXZ8BsDUXb54bhFtaVMUT9nU',
          toAddress: 'Hvt7wmdSEyDfptyojo4iiS3sroTPKAeKMAc4PNzXg7Ds',
          sol: 0.01,
        }
      ]
    });

    console.log(transaction)
    expect(transaction instanceof Error).toBe(false);
  })
})
