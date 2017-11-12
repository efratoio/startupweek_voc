import { parseApi, url } from "./utils";
import { Transaction } from "types";

export type TransactionsResult = string[][];

export async function transactions(token: string): Promise<TransactionsResult> {
    return parseApi<TransactionsResult>(fetch(url(`/get?user=${token}`)));
}

export async function processSpeech(data: string): Promise<Transaction> {
    const body = new FormData();
    body.append("data", data);
    return parseApi<Transaction>(fetch(url(`/process`), {
        method: "POST",
        body
    }));
}

export async function save(token: string, category: string, amount: number, currency: string): Promise<Transaction> {
    const body = new FormData();
    body.append("user", token);
    body.append("category", category);
    body.append("amount", `${amount}`);
    body.append("currency", currency);

    return parseApi<Transaction>(fetch(url(`/save`), {
        method: "POST",
        body
    }));
}
