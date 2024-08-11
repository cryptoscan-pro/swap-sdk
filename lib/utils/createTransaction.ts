import { NetworkName } from "../types/NetworkName.js";
import { ENDPOINT } from "./constants.js";
import { loadTransaction } from "./loadTransaction.js";

interface BaseParams {
	type?: string;
	network: NetworkName;
	from: string;
	to: string;
	amount: number;
	fee?: number;
}

export interface CreateSwapParams extends BaseParams {
	type?: 'swap';
	service?: string;
	walletAddress: string;
	slippage?: number;
}

export interface CreateTransferParams extends BaseParams {
	type: 'transfer';
	coinAddress: string;
}

export type CreateTransactionParams = CreateTransferParams | CreateSwapParams;

function filterAndConvert(obj: { [key: string]: any }): { [key: string]: string } {
	const result: { [key: string]: string } = {};

	for (const key in obj) {
		if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
			result[key] = obj[key].toString();
		}
	}

	return result;
}

export const createTransaction = async (params: CreateTransactionParams) => {
	const searchParams = new URLSearchParams(filterAndConvert(params));
	const response = await fetch(`${ENDPOINT}/createTransaction?${searchParams.toString()}`);

	if (!response.ok) {
		throw new Error(`Failed to create transaction: ${response.statusText}`);
	}

	const data = await response.json();

	if (!('txn' in data)) {
		throw new Error('Failed to create transaction: no txn found in response');
	}

	return loadTransaction({ txn: data.txn, ...params });
}
