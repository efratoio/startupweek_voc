import * as React from "react";
import { ApiStore } from "store";
import * as css from "./login.scss";
import { Link } from "react-router-dom";
import { routeSignup } from "routing";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import { inject, external } from "tsdi";
import bind from "bind-decorator";
import { validateUsername, validatePassword } from "utils";
import { RequestStatus } from "request-status";

@external @observer
export class PageLogin extends React.Component {
    @inject private api: ApiStore;

    @observable private username = "";
    @observable private password = "";

    @bind @action private handleUsername({ target }: React.SyntheticInputEvent) { this.username = target.value; }
    @bind @action private handlePassword({ target }: React.SyntheticInputEvent) { this.password = target.value; }
    @bind private handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        this.api.doLogin(this.username, this.password);
    }

    @computed private get usernameValid() { return validateUsername(this.username); }
    @computed private get passwordValid() { return true; } // validatePassword(this.password); }
    @computed private get allValid() { return this.usernameValid && this.passwordValid; }

    public render() {
        return (
            <div>
                <h1>Boilerplate</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>
                            Username
                            <input
                                value={this.username}
                                onChange={this.handleUsername}
                            />
                        </label>
                    </p>
                    {/*<p>
                        <label>
                            Password
                            <input
                                type="password"
                                value={this.password}
                                onChange={this.handlePassword}
                            />
                        </label>
                    </p>*/}
                    <button type="submit" disabled={!this.allValid}>Login</button>
                </form>
                <p>Don't have an account? Signup <Link to={routeSignup()}>here</Link>.</p>
            </div>
        );
    }
}
