import { VersionedTransaction } from "@solana/web3.js";
import { getTransactionByTxn } from "./getTransactionByTxn";
import { ENDPOINT } from "./constants";
import { getIsSolAddress } from "./getIsSolAddress";

export interface ICreateSwapTransactionParams {
	walletAddress: string;
	from: string;
	to: string;
	amount?: number;
	payerAddress?: string;
	slippage?: number;
	fee?: number;
	priorityFee?: number;
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
	priorityFee,
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

	if (!getIsSolAddress(to)) {
		if (typeof amount !== 'number') {
			return new Error('"amount" is required');
		}

		if (amount <= 0) {
			return new Error('"amount" must be greater than 0');
		}
	}

	const params = new URLSearchParams({
		walletAddress,
		from,
		to,
	});

	if (payerAddress) {
		params.set('payerAddress', payerAddress);
	}

	if (priorityFee) {
		params.set('priorityFee', String(priorityFee));
	}

	if (slippage) {
		params.set('priorityFee', String(slippage));
	}

	if (fee) {
		params.set('fee', String(fee));
	}

	if (amount) {
		params.set('amount', String(amount));
	}

	const res = await fetch(ENDPOINT + '/swap?' + params.toString());
	const data = await res.json();

	if (data.error) {
		return new Error(data.err)
	}

	if (!data?.txn) {
		return new Error('Failed to create swap transaction');
	}

	const { txn } = data as ICreateTransactionResponse;

	return getTransactionByTxn(txn);
}
