import { VersionedTransaction } from "@solana/web3.js";
import { getTransactionByTxn } from "./getTransactionByTxn";
import { ENDPOINT } from "./constants";

export interface ICreateSwapTransactionParams {
	walletAddress: string;
	from: string;
	to: string;
	amount: number;
	payerAddress?: string;
	slippage?: number;
	fee?: number;
}

export interface ICreateTransactionResponse {
	txn: string;
}

export const createSwapTransaction = async ({ 
	walletAddress, 
	from, 
	to, 
	amount,
	payerAddress,
	slippage,
	fee,
}: ICreateSwapTransactionParams): Promise<VersionedTransaction | Error> => {
	if (!walletAddress) {
		return new Error('"walletAddress" is required');
	}

	if (typeof from !== 'string') {
		return new Error('"from" is required');
	}

	if (typeof to !== 'string') {
		return new Error('"to" is required');
	}

	if (typeof amount !== 'number') {
		return new Error('"amount" is required');
	}

	if (amount <= 0) {
		return new Error('"amount" must be greater than 0');
	}

	const params = new URLSearchParams({
		walletAddress,
		from,
		to,
		amount: String(amount),
		payerAddress: payerAddress || '',
		slippage: String(slippage),
		fee: String(fee),
	});

	const res = await fetch(ENDPOINT + '/swap?' + params.toString());
	const data = await res.json();

	if (!data?.txn) {
		return new Error('Failed to create swap transaction');
	}

	const { txn } = data as ICreateTransactionResponse;

	return getTransactionByTxn(txn);
}