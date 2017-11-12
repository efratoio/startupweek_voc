import * as React from "react";

import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";
import * as css from "./dashboard.scss";
import { requireLogin } from "utils";
import { inject, external } from "tsdi";
import bind from "bind-decorator";
import { validateCategory, validateAmount } from "utils";
import { ActionBar } from "ui";

import { ApiStore, TransactionsStore } from "store";

import { SpeechRecognitionOverlay } from "ui";

@observer @external
export class PageAdd extends React.Component {
	@inject private api: ApiStore;
	@inject private transactions: TransactionsStore;

    @computed get category() { return this.transactions.unsavedTransaction.category; }
    @computed get amount() { return this.transactions.unsavedTransaction.amount.toString(); }

    @bind @action private handleCategory({ target }: React.SyntheticInputEvent) {
		this.transactions.editUnsavedTransaction(target.value, undefined, undefined);
	}
    @bind @action private handleAmount({ target }: React.SyntheticInputEvent) {
		let amount;
		if (target.value === "") {
			amount = 0;
		}
		else {
			amount = parseInt(target.value);
		}
		this.transactions.editUnsavedTransaction(undefined, amount, undefined);
	}
    @bind private handleSubmit() { this.transactions.doSave(); }

    @computed private get categoryValid() { return validateCategory(this.category); }
    @computed private get amountValid() { return validateAmount(this.amount); }
    @computed private get allValid() { return this.categoryValid && this.amountValid; }

	public render(): JSX.Element {
		const { unsavedTransaction } = this.transactions;
		return (
            <div>
                <ActionBar />
                <h2>Please enter a category and the corresponding value you paid.</h2>
                {
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
								Value
								<input
									name="valueInput"
									type="value"
									value={this.amount}
									onChange={this.handleAmount}
								/>
							</label>
						</p>
						<button type="submit" disabled={!this.allValid}>Save</button>
					</form>
				}
            </div>
        );
	}
}
