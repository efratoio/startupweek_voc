import * as React from "react";
import * as css from "./dashboard.scss";
import { requireLogin } from "utils";
import { TransactionList, CategoryPieChart, DashboardActionBar } from "ui";

@requireLogin
export class PageDashboard extends React.Component {
    public render() {
        return (
            <div>
                <DashboardActionBar />
                <CategoryPieChart />
                <h2>Transactions</h2>
                <TransactionList />
            </div>
        );
    }
}
