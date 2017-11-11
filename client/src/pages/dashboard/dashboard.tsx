import * as React from "react";
import * as css from "./dashboard.scss";
import { requireLogin } from "utils";
import { TransactionList, CategoryPieChart } from "ui";

@requireLogin
export class PageDashboard extends React.Component {
    public render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <h2>Transactions</h2>
                <TransactionList />
                <CategoryPieChart />
            </div>
        );
    }
}
