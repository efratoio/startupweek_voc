import { parseApi, url } from "./utils";
import { Transaction } from "types";

export type TransactionsResult = string[][];

export async function transactions(token: string): Promise<TransactionsResult> {
    return parseApi<TransactionsResult>(fetch(url(`/get?user=${token}`)));
}
