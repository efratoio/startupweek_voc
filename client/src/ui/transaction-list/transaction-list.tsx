import * as React from "react";
import * as css from "./dashboard.scss";
import { requireLogin } from "utils";
import { TransactionsStore } from "store";
import { inject, external } from "tsdi";
import { observer } from "mobx-react";

@requireLogin @external @observer
export class TransactionList extends React.Component {
    @inject private transactionsStore: TransactionsStore;

    public render() {
        const { transactions } = this.transactionsStore;
        return (
            <ul>
                {
                    transactions.map(({ category, value}, index) => (
                        <li key={index}>
                            {`${category}: ${value}`}
                        </li>
                    ))
                }
            </ul>
        );
    }
}
