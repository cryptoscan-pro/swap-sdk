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

	let _data = await res.text();

	if (typeof _data === 'string') {
		return new Error(_data);
	}

	const data = JSON.parse(_data);

	if (!data?.txn) {
		return new Error('Failed to create swap transaction');
	}

	const { txn } = data as ICreateTransactionResponse;

	return getTransactionByTxn(txn);
}