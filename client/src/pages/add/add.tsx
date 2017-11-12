import * as React from "react";

import { inject, external } from "tsdi";
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";

import { TransactionsStore } from "store";

import { SpeechRecognitionOverlay } from "ui";

@observer @external
export class PageAdd extends React.Component {
	@inject private transactions: TransactionsStore;

	public render(): JSX.Element {
		const { unsavedTransaction } = this.transactions;
		return (
			<div>
				<h1> add entry</h1>
				<SpeechRecognitionOverlay open={!unsavedTransaction}/>
				{
					unsavedTransaction ? JSON.stringify(unsavedTransaction) : null
				}
			</div>
		)
	}
}
