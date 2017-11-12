const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

import { component, factory } from "tsdi";

export class SpeechRecognitionApi {
	public addEventListener(eventName: string, listener: (event: any) => void): void {}
	public start(): void {}
	public stop(): void {}
}


@component
export class SpeechRecognitionFactory {
    @factory({ name: "speechRecognition" })
    public createSpeechRecognition(): SpeechRecognitionApi {
		const recognition = new SpeechRecognition();

		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		return recognition;
    }
}
