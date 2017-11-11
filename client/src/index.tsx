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
import { App } from "app";

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
