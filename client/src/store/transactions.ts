import { component, inject, initialize } from "tsdi";
import { TransactionsResult, transactions, processSpeech, save } from "api";
import { ApiStore } from ".";
import { observable, action, computed } from "mobx";
import { Transaction } from "types";
import { bind } from "bind-decorator";

const now = new Date();

@component
export class TransactionsStore {
    @inject private api: ApiStore;

    @observable public transactions: Transaction[] = [];
    @observable public unsavedTransaction: Transaction = { category: "", amount: 0, currency: "Euro" };

    @computed public get byCategory(): { [category: string]: number } {
        return this.transactions.reduce((result, transaction) => {
            const { category, amount } = transaction;
            const current = result[category] || 0;
            result[transaction.category] = current + amount;
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
                amount: parseFloat(item[2]),
                currency: item[3],
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

    @action
    public async doSave() {
        const category = this.unsavedTransaction.category;
        const amount = this.unsavedTransaction.amount;
        const body = { category, amount };
        const response = await this.api.call(
            "doSubmitItem",
            async () => save(this.api.authToken, category, amount, "$"),
            true,
        );
        if (response) {
            this.transactions.push(response);
        }
    }
        @action
        public editUnsavedTransaction(newCategory?: string, newAmount?: number, newCurrency?: string) {
            const newUnsavedTransaction = {
                category: newCategory || this.unsavedTransaction.category,
                amount: newAmount || this.unsavedTransaction.amount,
                currency: newCurrency || this.unsavedTransaction.currency,
            };
            if (newAmount === 0) {
                newUnsavedTransaction.amount = 0;
            }
            this.unsavedTransaction = newUnsavedTransaction;
        }
}
