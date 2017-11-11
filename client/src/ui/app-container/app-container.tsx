import * as React from "react";
import * as style from "./style.scss";
import { Errors } from "ui";
import { observer } from "mobx-react";

declare var SOFTWARE_VERSION: string;

@observer
export class AppContainer extends React.Component<{}, undefined> {
    public render() {
        return (
            <div>
                <Errors />
                {this.props.children}
                <div className={style.version}>{SOFTWARE_VERSION}</div>
            </div>
        );
    }
}
