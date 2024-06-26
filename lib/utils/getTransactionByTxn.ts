import { VersionedTransaction } from "@solana/web3.js";

export const getTransactionByTxn = (txn: string): VersionedTransaction => {
	return VersionedTransaction.deserialize(
		Buffer.from(txn, "base64")
	);
}
