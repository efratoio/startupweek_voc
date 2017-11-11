import * as React from "react";
import { ApiStore } from "store";
import * as css from "./login.scss";
import { Link } from "react-router-dom";
import { routeSignup } from "routing";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import { inject, external } from "tsdi";
import bind from "bind-decorator";
import { validateEMail, validatePassword } from "utils";
import { RequestStatus } from "request-status";

@external @observer
export class PageLogin extends React.Component {
    @inject private api: ApiStore;

    @observable private email = "";
    @observable private password = "";

    @bind @action private handleEMail({ target }: React.SyntheticInputEvent) { this.email = target.value; }
    @bind @action private handlePassword({ target }: React.SyntheticInputEvent) { this.password = target.value; }
    @bind private handleSubmit() { this.api.doLogin(this.email, this.password); }

    @computed private get emailValid() { return validateEMail(this.email); }
    @computed private get passwordValid() { return validatePassword(this.password); }
    @computed private get allValid() { return this.emailValid && this.passwordValid; }

    public render() {
        return (
            <div>
                <h1>Boilerplate</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>
                            Email
                            <input
                                value={this.email}
                                onChange={this.handleEMail}
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            Password
                            <input
                                type="password"
                                value={this.password}
                                onChange={this.handlePassword}
                            />
                        </label>
                    </p>
                    <button type="submit" disabled={!this.allValid}>Login</button>
                </form>
                <p>Don't have an account? Signup <Link to={routeSignup()}>here</Link>.</p>
            </div>
        );
    }
}
