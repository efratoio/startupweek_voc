import * as React from "react";
import { Link } from "react-router-dom";
import { routeLogin } from "routing";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import { inject, external } from "tsdi";
import bind from "bind-decorator";
import { validateUsername, validatePassword } from "utils";
import { RequestStatus } from "request-status";
import { ApiStore, SignupStore } from "store";
import * as css from "./signup.scss";

@external @observer
export class PageSignup extends React.Component {
    @inject private api: ApiStore;
    @inject private signup: SignupStore;

    @observable private username = "";
    @observable private password = "";
    @observable private repeat = "";

    @bind @action private handleUsername({ target }: React.SyntheticInputEvent) { this.username = target.value; }
    @bind @action private handlePassword({ target }: React.SyntheticInputEvent) { this.password = target.value; }
    @bind @action private handleRepeat({ target }: React.SyntheticInputEvent) { this.repeat = target.value; }
    @bind private handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        this.signup.doSignup(this.username, this.password);
    }

    @computed private get usernameValid() { return validateUsername(this.username); }
    @computed private get passwordValid() { return true; } // validatePassword(this.password) && this.password === this.repeat; }
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
                    </p>
                    <p>
                        <label>
                            Repeat
                            <input
                                type="password"
                                value={this.repeat}
                                onChange={this.handleRepeat}
                            />
                        </label>
                    </p>*/}
                    <button type="submit" disabled={!this.allValid}>Signup</button>
                </form>
                <p>Already have an account? Login <Link to={routeLogin()}>here</Link>.</p>
            </div>
        );
    }
}
