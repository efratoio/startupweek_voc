import * as React from "react";
import { PieChart, Pie, Sector, RechartsFunction } from "recharts";
import { external, inject } from "tsdi";
import { PIE_FILL } from "ui/colors";
import { TransactionsStore } from "store";
import { Transaction } from "types";
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";
import { bind } from "bind-decorator";
import { ActiveShape } from "./active-shape";
import { Category } from "./types";

import * as css from "./category-pie-chart.scss";

@observer @external
export class CategoryPieChart extends React.Component {
    @inject private transactions: TransactionsStore;

    @observable private activeCategory: string;

    @computed private get categoryArray(): Category[] {
        const { byCategory } = this.transactions;
        return Object.keys(byCategory)
            .map(category => ({
                category,
                value: byCategory[category]
            }))
            .sort(({ value: a }, { value: b }) => a - b);
    }

    @computed private get activeIndex(): number {
        const { categoryArray } = this;
        return categoryArray.findIndex(({ category }) => category === this.activeCategory);
    }

    @computed private get total(): {amount: number, currency: string} {
        return this.transactions.transactions.reduce(
            (current: {amount: number, currency: string}, transaction: Transaction) => ({
                amount: current.amount + transaction.amount,
                currency: current.currency.indexOf(transaction.currency) === -1 ?
                    `${current.currency}${current.currency.length ? " or " : ""}${transaction.currency}` :
                    current.currency
            }),
            {amount: 0, currency: ""}
        );
    }

    @bind @action
    private doPieEnter({ category }, index: number) {
        this.activeCategory = category;
    }

    @bind @action
    private doShowAll() {
        this.activeCategory = undefined;
    }

    public render() {
        const { categoryArray, activeIndex, total } = this;
        return (
            <div className={css["category-pie-chart"]}>
                <PieChart width={320} height={320}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={ActiveShape}
                        data={categoryArray}
                        cx={160}
                        cy={160}
                        innerRadius={130}
                        outerRadius={150}
                        fill={PIE_FILL}
                        onMouseEnter={this.doPieEnter as RechartsFunction}
                    />
                </PieChart>
                {
                    activeIndex !== -1 ? (
                        <button className={css["button"]} onClick={this.doShowAll}>
                            Show all
                        </button>
                    ) : null
                }
                {
                    activeIndex === -1 ?(
                        <div className={css["total-container"]}>
                            <div className={css["total-box"]}>
                                <p>Total</p>
                                <p className={css["total"]}>
                                    {`${total.amount}${total.currency}`}
                                </p>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}
