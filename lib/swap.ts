import sendTransaction, { ISendSolanaTransactionParams } from "@cryptoscan/solana-send-transaction";
import { ICreateSwapTransactionParams, createSwapTransaction } from "./utils/createSwapTransaction";
import { Keypair } from "@solana/web3.js";

export interface ISwapParams extends ISendSolanaTransactionParams, Omit<ICreateSwapTransactionParams, 'walletAddress'> {
	wallet: Keypair;
}

export async function swap({ 
	wallet, 
	from, 
	to, 
	amount, 
	payerAddress, 
	slippage, 
	fee, 
	priorityFee,
	...sendOptions 
}: ISwapParams): Promise<string | Error> {
	if (!wallet) {
		return new Error('"wallet" is required');
	}

	if (!wallet.publicKey) {
		return new Error('"wallet" must be a Keypair');
	}

	const transaction = await createSwapTransaction({
		walletAddress: wallet.publicKey.toString(),
		from,
		to,
		amount,
		payerAddress,
		slippage,
		fee,
		priorityFee,
	})

	if (transaction instanceof Error) {
		return transaction;
	}

	transaction.sign([wallet]);

	return sendTransaction(transaction, sendOptions)
}
