import * as React from "react";
import { ApiStore } from "store";
import * as css from "./dashboard.scss";
import { requireLogin } from "utils";
import { observable, action, computed } from "mobx";
import { inject, external } from "tsdi";
import bind from "bind-decorator";
import { validateCategory, validateAmount } from "utils";

@requireLogin
export class PageInut extends React.Component {
    @inject private api: ApiStore;

    @observable private category = "";
    @observable private amount = "";

    @bind @action private handleCategory({ target }: React.SyntheticInputEvent) { this.category = target.value; }
    @bind @action private handleAmount({ target }: React.SyntheticInputEvent) { this.amount = target.value; }
    @bind private handleSubmit() { this.api.doSubmitItem(this.category, parseInt(this.amount)); }

    @computed private get categoryValid() { return validateCategory(this.category); }
    @computed private get amountValid() { return validateAmount(this.amount); }
    @computed private get allValid() { return this.categoryValid && this.amountValid; }

    public render() {
        return (
            <div>
                <h1>Please enter a category and the corresponding amount you paid.</h1>
                <form id="inputForm" onSubmit={this.handleSubmit}>
                    <p>
                        <label>
                            Category
                            <input
                                name="categoryInput"
                                value={this.category}
                                onChange={this.handleCategory}
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            Amount
                            <input
                                name="amountInput"
                                type="amount"
                                value={this.amount}
                                onChange={this.handleAmount}
                            />
                        </label>
                    </p>
                    <button type="submit" disabled={!this.allValid}>Save</button>
                </form>
            </div>
        );
    }
}
