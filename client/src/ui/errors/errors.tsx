import * as React from "react";
import { ErrorComponent } from "./error-component";
import { observer } from "mobx-react";
import { ApiStore } from "store";
import { inject, external } from "tsdi";

@observer @external
export class Errors extends React.PureComponent<{}> {
    @inject private api: ApiStore;

    public render() {
        const { latestError, doDismiss } = this.api;
        if (!latestError) {
            return null; // tslint:disable-line
        }
        return (
            <ErrorComponent
                title="An Error Occured"
                message={latestError.message}
            />
        );
    }
}
