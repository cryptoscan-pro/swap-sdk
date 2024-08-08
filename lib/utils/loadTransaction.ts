import { Transaction, VersionedTransaction } from "@solana/web3.js";
import { NetworkName } from "../types/NetworkName";

interface BaseParams {
	network: NetworkName;
	txn: string;
}

interface SolanaParams extends BaseParams {
	isLegacy?: boolean;
}

export type LoadTransactionParams = SolanaParams;

export const loadTransaction = async ({ network, txn, isLegacy }: LoadTransactionParams) => {
	switch (network) {
		case 'solana': {
			if (isLegacy) {
				return Transaction.from(Buffer.from(txn, "base64"));
			}

			return VersionedTransaction.deserialize(
				Buffer.from(txn, "base64"),
			);
		}
		default:
			throw new Error(`${network} network is not implemented yet. Please ask to support this network: https://t.me/daniil_jave`)
	}
}
