import { Connection, Keypair } from "@solana/web3.js";
import { createTransaction, CreateTransactionParams } from "./createTransaction.js";
import sendTransaction from "@cryptoscan/solana-send-transaction";

interface SwapBaseParams extends Omit<CreateTransactionParams, 'walletAddress'> {
	wallet: unknown;
}

interface SolanaSwapParams extends SwapBaseParams {
	network: 'solana';
	wallet: Keypair;
}

export type SwapParams = SolanaSwapParams;


export const swap = async ({ wallet, ...params }: SwapParams): Promise<string> => {
	switch (params.network) {
		case 'solana': {
			const walletAddress = wallet.publicKey.toString();
			const newParams = {
				...params,
				walletAddress,
			}
			const transaction = await createTransaction(newParams as CreateTransactionParams);
			const connection = new Connection(process.env.CONNECTION_URL!, {
				wsEndpoint: process.env.WS_CONNECTION_URL!,
			});
			const txid = await sendTransaction(transaction, {
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
