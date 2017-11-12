import { component, inject, initialize } from "tsdi";
import { TransactionsResult, transactions, processSpeech } from "api";
import { ApiStore } from ".";
import { observable, action, computed } from "mobx";
import { Transaction } from "types";
import { bind } from "bind-decorator";

const now = new Date();

@component
export class TransactionsStore {
    @inject private api: ApiStore;

    @observable public transactions: Transaction[] = [];
    @observable public unsavedTransaction: Transaction;

    @computed public get byCategory(): { [category: string]: number } {
        return this.transactions.reduce((result, transaction) => {
            const { category, value } = transaction;
            const current = result[category] || 0;
            result[transaction.category] = current + value;
            return result;
        }, {});
    }

    @action @initialize
    public async doLoadTransactions() {
        const response = await this.api.call(
            "doLoadTransactions",
            () => transactions(this.api.authToken),
        );
        if (response) {
            this.transactions = response.map((item) => ({
                value: parseFloat(item[2]),
                category: item[1]
            }));
        }
    }

    @action
    public async doGenerateTransactionFromString(data: string) {
        const response = await this.api.call(
            "doGenerateTransactionFromString",
            () => processSpeech(data)
        );

        if (response) {
            this.unsavedTransaction = response;
        }
    }
}
