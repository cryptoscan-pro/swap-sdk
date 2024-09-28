import { Connection, Keypair } from "@solana/web3.js";
import { createTransaction, type CreateTransactionParams } from "./createTransaction.js";
import sendTransaction from "@cryptoscan/solana-send-transaction";

interface SwapBaseParams extends Omit<CreateTransactionParams, 'walletAddress'> {
	wallet: unknown;
}

type SolanaSwapParams<P = SwapBaseParams> = P & {
	network: 'solana';
	connection?: Connection;
	wallet: Keypair;
}

export type SwapParams<Params = SwapBaseParams> = SolanaSwapParams<Params>;

export const swap = async ({ wallet, connection: paramsConnection, ...params }: SwapParams<SwapBaseParams>): Promise<string> => {
	switch (params.network) {
		case 'solana': {
			const walletAddress = wallet.publicKey.toString();
			const newParams = {
				...params,
				walletAddress,
				isLegacy: false,
			}
			const transaction = await createTransaction(newParams as CreateTransactionParams);
			const connection = paramsConnection || new Connection(process.env.CONNECTION_URL!, {
				wsEndpoint: process.env.WS_CONNECTION_URL!,
			});
			transaction.sign([wallet]);
			console.log((transaction.message as any).instructions)
			const txid = await sendTransaction(transaction.serialize(), {
				connection,
				checkBlockHeight: false,
				speed: 'fast',
			});
			return txid;
		}
		default: 
			throw new Error(`${params.network} network is not implemented yet. Please ask to support this network: https://t.me/daniil_jave`)
	}
}
