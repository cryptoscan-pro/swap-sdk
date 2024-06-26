import { Keypair } from "@solana/web3.js";
import { getTransactionByTxn } from "./utils/getTransactionByTxn";
import sendTransaction, { ISendSolanaTransactionParams } from "solana-send-transaction";

export interface ISwapParams extends ISendSolanaTransactionParams {
	wallet: Keypair;
	from: string;
	to: string;
	amount: number;
}

interface ICreateTransactionResponse {
	txn: string;
}

const ENDPOINT = process.env.SWAP_ENDPOINT || 'https://api.cryptoscan.pro/v1';

export async function swap({ wallet, from, to, amount, ...sendOptions }: ISwapParams) {
	if (!wallet) {
		return new Error('"wallet" is required');
	}

	if (!wallet.publicKey) {
		return new Error('"wallet" must be a Keypair');
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

	const res = await fetch(ENDPOINT + '/swap');
	const data: ICreateTransactionResponse = await res.json();

	if (!('txn' in data)) {
		throw new Error('"txn" not found in response');
	}

	const { txn } = data;

	const transaction = getTransactionByTxn(txn);

	transaction.sign([wallet]);

	return sendTransaction(transaction, sendOptions)
}
