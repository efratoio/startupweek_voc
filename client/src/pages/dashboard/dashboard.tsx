import * as React from "react";
import * as css from "./dashboard.scss";
import { requireLogin } from "utils";
import { TransactionList, CategoryPieChart, ActionBar } from "ui";

@requireLogin
export class PageDashboard extends React.Component {
    public render() {
        return (
            <div>
                <ActionBar />
                <CategoryPieChart />
                <h2>Transactions</h2>
                <TransactionList />
            </div>
        );
    }
}
