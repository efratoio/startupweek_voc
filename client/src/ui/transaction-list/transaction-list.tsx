import * as React from "react";
import * as css from "./dashboard.scss";
import { requireLogin } from "utils";
import { TransactionsStore } from "store";
import { inject, external } from "tsdi";
import { observer } from "mobx-react";

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

@requireLogin @external @observer
export class TransactionList extends React.Component {
    @inject private transactionsStore: TransactionsStore;

    public render() {
        const { transactions } = this.transactionsStore;
        return (
            <List>
                {
                    transactions.map(({ category, value}, index) => ([
                        <Divider />,
                        <ListItem key={index} disabled primaryText={`${category}: ${value}`} />,
                    ]))
                }
            </List>
        );
    }
}
