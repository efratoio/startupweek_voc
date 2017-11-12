import * as React from "react";

import { inject, external } from "tsdi";
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";

import { SpeechRecognitionApi } from "factories";
import { TransactionsStore } from "store";

import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import MicIcon from 'material-ui/svg-icons/av/mic';

import * as css from "./speech-recognition-overlay.scss";

export interface SpeechRecognitionOverlayProps {
	open: boolean;
}

const LARGE_ICON = {
	width: "50px",
	height: "50px"
}

@observer @external
export class SpeechRecognitionOverlay extends React.Component<SpeechRecognitionOverlayProps> {
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
			<Dialog
				modal={true}
				open={this.props.open}
				contentClassName={css["speech-recognition-overlay-content"]}
			>
			{
				isRecording ? (
					<div className={css["overlay-box"]}>
						<MicIcon style={LARGE_ICON} color={speechDetected ? "green" : "grey"}/>
					</div>
				) : null
			}
			{
				isRecording ? (<p>Say: coffee 3 dollars</p>) : <CircularProgress size={50} thickness={5} />
			}
			</Dialog>
		);
	}
}
