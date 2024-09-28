import { Transaction, VersionedTransaction } from "@solana/web3.js";
import { NetworkName } from "../types/NetworkName.js";

interface BaseParams {
	network: NetworkName;
	txn: string;
}

interface SolanaParams<IsLegacy> extends BaseParams {
	isLegacy?: IsLegacy;
}

export type LoadTransactionParams<IsLegacy> = SolanaParams<IsLegacy>;

export const loadTransaction = <IsLegacy, Response = IsLegacy extends true ? Transaction : VersionedTransaction>({ network, txn, isLegacy }: LoadTransactionParams<IsLegacy>): Response => {
	switch (network) {
		case 'solana': {
			if (isLegacy) {
				return Transaction.from(Buffer.from(txn, "base64")) as Response;
			}

			console.log('nolegacy')
			return VersionedTransaction.deserialize(
				Buffer.from(txn, "base64"),
			) as Response;
		}
		default:
			throw new Error(`${network} network is not implemented yet. Please ask to support this network: https://t.me/daniil_jave`)
	}
}
