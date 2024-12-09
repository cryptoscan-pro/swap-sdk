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
    if (params.type !== 'swap' && params.type !== 'transfer') {
        throw new Error('Invalid transaction type');
    }

    if (!params.network) {
        throw new Error('Network is required');
    }

    if (!params.from) {
        throw new Error('From address is required');
    }

    if (!params.to) {
        throw new Error('To address is required');
    }

    if (typeof params.amount !== 'number') {
        throw new Error('Amount must be a number');
    }

    if (params.fee && typeof params.fee !== 'number') {
        throw new Error('Fee must be a number');
    }

    if (params.type === 'swap') {
        if (!params.service) {
            throw new Error('Service is required for swap');
        }

        if (!params.walletAddress) {
            throw new Error('Wallet address is required for swap');
        }

        if (params.slippage && typeof params.slippage !== 'number') {
            throw new Error('Slippage must be a number');
        }
    } else if (params.type === 'transfer' && !params.coinAddress) {
                 throw new Error('Coin address is required for transfer');
           }

    const searchParams = new URLSearchParams(filterAndConvert(params));
    const response = await fetch(`${ENDPOINT}/createTransaction?${searchParams.toString()}`);

    if (!response.ok) {
        console.log(response);
        throw new Error(`Failed to create transaction: ${response.statusText}`);
    }

	const data = await response.json();
	return loadTransaction({ txn: data.txn, ...params })
}
