import { ExchangeName } from "./ExchangeName";

export interface BaseInstruction {
    type: string;
}

export interface BuyInstruction extends BaseInstruction {
    type: 'buy';
    service: ExchangeName;
    sol: number;
    coinAddress: string;
    walletAddress: string;
    slippage: number;
}

export interface SellInstruction extends BaseInstruction {
    type: 'sell';
    service: ExchangeName;
    sol?: number;
    coinAddress: string;
    walletAddress: string;
    slippage: number;
}

export interface BudgetLimitInstruction extends BaseInstruction {
    type: 'budgetLimit';
    sol?: number;
}

export interface BudgetPriceInstruction extends BaseInstruction {
    type: 'budgetPrice';
    sol: number;
}

export interface TransferInstruction extends BaseInstruction {
    type: 'transfer';
    sol: number;
    fromAddress: string;
    toAddress: string;
    coinAddress?: string;
}

export interface CreateAccountInstruction extends BaseInstruction {
    type: 'createAccount';
    payerAddress: string;
    walletAddress: string;
    coinAddress: string;
}

export interface CloseAccountInstruction extends BaseInstruction {
    type: 'closeAccount';
    walletAddress: string;
    coinAddress: string;
}

export type Instruction = BuyInstruction
    | SellInstruction
    | TransferInstruction
    | BudgetPriceInstruction
    | BudgetLimitInstruction
    | CreateAccountInstruction
    | CloseAccountInstruction;
