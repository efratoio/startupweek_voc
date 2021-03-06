import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";
import DevTools from "mobx-react-devtools";
import "style.scss";
import "factories";
import "store";
import { TSDI, component, factory } from "tsdi";
import { History } from "history";
import { isProductionEnvironment } from "utils/environment";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from "ui/app-container";
import { PageLogin, PageDashboard, PageSignup, PageAdd } from "pages";
import { Route, Switch, Redirect } from "react-router-dom";

function Container() {
    return (
        <div>
            <Route path="/dashboard" component={PageDashboard} />
        </div>
    );
}

export function App() {
    return (
        <MuiThemeProvider>
             <AppContainer>
                <Switch>
                    <Redirect exact from="/" to="/login" />
                    <Route path="/login" component={PageLogin} />
                    <Route path="/signup" component={PageSignup} />
                    <Route path="/add" component={PageAdd} />
                    <Route component={Container} />
                </Switch>
            </AppContainer>
        </MuiThemeProvider>
    );
}

function main() {
    const tsdi: TSDI = new TSDI();
    tsdi.enableComponentScanner();

    ReactDOM.render(
        <div>
            <Router history={tsdi.get("history")}>
                <App />
            </Router>
            {!isProductionEnvironment() && <DevTools />}
        </div>,
        document.getElementById("root"),
    );
}

main();
