import * as React from "react";

import { inject, external } from "tsdi";
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";

import { SpeechRecognitionApi } from "factories";
import { TransactionsStore } from "store";

import { FaMicrophone, FaSpinner } from "react-icons/lib/fa";

import * as css from "./speech-recognition-overlay.scss";

@observer @external
export class SpeechRecognitionOverlay extends React.Component {
	@inject private speechRecognition: SpeechRecognitionApi;
	@inject private transactions: TransactionsStore;

	@observable private speechDetected: boolean;
	@observable private text: string;
	@observable private error: string;

	@computed private get isRecording(): boolean {
		return !this.text && !this.error;
	}

	public componentDidMount(): void {
		const { speechRecognition } = this;

		speechRecognition.addEventListener("speechstart", () => {
			console.log("Speech detected");
			this.speechDetected = true;
		});

		speechRecognition.addEventListener("result", (e) => {
			let last = e.results.length - 1;
			let text = e.results[last][0].transcript;

			this.text = text;

			this.transactions.doGenerateTransactionFromString(text);
			console.log(text, "Confidence: " + e.results[0][0].confidence);
		});

		speechRecognition.addEventListener("speechend", () => {
			console.log("Speech end");
			this.speechDetected = false;

			speechRecognition.stop();
		});

		speechRecognition.addEventListener("error", (e) => {
			this.error = e.error;
		});

		speechRecognition.start();
	}

	public render(): JSX.Element {
		const { isRecording, speechDetected } = this;
		return (
			<div className={css["speech-recognition-overlay"]}>
				<div className={css["overlay-box"]}>
					{
						isRecording ? <FaMicrophone size={100} color={speechDetected ? "green" : "grey"}/> : null
					}
					{
						!isRecording ? <FaSpinner size={100}/> : null
					}

				</div>
			</div>
		);
	}
}
