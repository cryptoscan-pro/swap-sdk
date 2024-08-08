import { VersionedTransaction, Transaction } from "@solana/web3.js";
import solanaSendTransaction from '@cryptoscan/solana-send-transaction';
import { NetworkName } from "../types/NetworkName.js";

interface BaseParams {
	network: NetworkName;
	transaction: unknown;
	payerAddress: string;
}

interface SolanaParams extends BaseParams {
	network: 'solana';
	transaction: VersionedTransaction | Transaction;
}

export type RunTransactionParams = SolanaParams

export const runTransaction = (params: RunTransactionParams) => {
	switch (params.network) {
		case 'solana': {
			return solanaSendTransaction(params.transaction);
		}
		default:
			throw new Error(`${params.network} network is not implemented yet. Please ask to support this network: https://t.me/daniil_jave`)
	}
}
