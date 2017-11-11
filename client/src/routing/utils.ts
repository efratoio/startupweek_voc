import * as patterns from "./patterns";

export type Route =
    { route: "login" } |
    { route: "dashboard" } |
    { route: "signup" };

export function parseRoute(url: string): Route {
    if (patterns.patternLogin.match(url)) {
        return { route: "login" };
    }
    if (patterns.patternDashboard.match(url)) {
        return { route: "dashboard" };
    }
    if (patterns.patternSignup.match(url)) {
        return { route: "signup" };
    }
}
