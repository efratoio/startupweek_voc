import * as React from "react";

export interface ErrorProps {
    readonly title: string;
    readonly message: string;
}

export class ErrorComponent extends React.Component<ErrorProps> {
    public render() {
        const { title, message } = this.props;
        return (
            <div>
                <h1>{title}</h1>
                <p>{message}</p>
            </div>
        );
    }
}
