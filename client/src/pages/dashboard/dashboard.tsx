import * as React from "react";
import * as css from "./dashboard.scss";
import { requireLogin } from "utils";

@requireLogin
export class PageDashboard extends React.Component {
    public render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Lorem Ipsum dolor sit amet. Edipiscir eunt.</p>
            </div>
        );
    }
}
