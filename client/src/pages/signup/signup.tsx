import * as React from "react";
import { Link } from "react-router-dom";
import { routeLogin } from "routing";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import { inject, external } from "tsdi";
import bind from "bind-decorator";
import { validateEMail, validatePassword } from "utils";
import { RequestStatus } from "request-status";
import { ApiStore, SignupStore } from "store";
import * as css from "./signup.scss";

@external @observer
export class PageSignup extends React.Component {
    @inject private api: ApiStore;
    @inject private signup: SignupStore;

    @observable private email = "";
    @observable private password = "";
    @observable private repeat = "";

    @bind @action private handleEMail({ target }: React.SyntheticInputEvent) { this.email = target.value; }
    @bind @action private handlePassword({ target }: React.SyntheticInputEvent) { this.password = target.value; }
    @bind @action private handleRepeat({ target }: React.SyntheticInputEvent) { this.repeat = target.value; }
    @bind private handleSubmit() { this.signup.doSignup(this.email, this.password); }

    @computed private get emailValid() { return validateEMail(this.email); }
    @computed private get passwordValid() { return validatePassword(this.password) && this.password === this.repeat; }
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
                    <p>
                        <label>
                            Repeat
                            <input
                                type="password"
                                value={this.repeat}
                                onChange={this.handleRepeat}
                            />
                        </label>
                    </p>
                    <button type="submit" disabled={!this.allValid}>Signup</button>
                </form>
                <p>Already have an account? Login <Link to={routeLogin()}>here</Link>.</p>
            </div>
        );
    }
}
