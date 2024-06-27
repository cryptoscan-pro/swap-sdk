import { Instruction } from "../types/Instruction";
import { ENDPOINT } from "./constants";
import { ICreateTransactionResponse } from "./createSwapTransaction";
import { getTransactionByTxn } from "./getTransactionByTxn";

export interface CreateTransactionParams {
	instructions: Instruction[];
	payerAddress: string;
}

export const createTransaction = async ({ instructions, payerAddress }: CreateTransactionParams) => {
	if (!payerAddress) {
		return new Error('"payerAddress" is required');
	}

	const body = {
		instructions,
		payerAddress,
	};

	const res = await fetch(ENDPOINT + '/createTransaction', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (data.error) {
		return new Error(data.error);
	}

	if (!data?.txn) {
		return new Error('Failed to create swap transaction');
	}

	const { txn } = data as ICreateTransactionResponse;

	return getTransactionByTxn(txn);
}
