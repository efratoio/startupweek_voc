import * as React from "react";

import { SpeechRecognitionOverlay } from "ui";

export class PageAdd extends React.Component {
	public render(): JSX.Element {
		return (
			<div>
				<h1> add entry</h1>
				<SpeechRecognitionOverlay />
			</div>
		)
	}
}
