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
