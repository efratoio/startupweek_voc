import * as patterns from "../patterns";

[
    {
        pattern: "patternLogin",
        okay: ["/login", "/login/"],
        fail: ["/signup", "/login?test=example", "", "/loginexample"],
    },
    {
        pattern: "patternSignup",
        okay: ["/signup", "/signup/"],
        fail: ["/login", "/signup?test=example", "", "/signupexample"],
    },
    {
        pattern: "patternDashboard",
        okay: ["/dashboard", "/dashboard/"],
        fail: ["/signup", "/dashboard?test=example", "", "/dashboardexample"],
    },
].forEach(({ pattern, okay, fail }) => {
    okay.forEach(url => {
        test(`The URL pattern "${pattern}" with the URL "${url}" returns the expected result`, () => {
            expect(patterns[pattern].match(url)).toMatchSnapshot();
        });
    });
    fail.forEach(url => {
        test(`The URL pattern "${pattern}" with the URL "${url}" returns \`undefined\``, () => {
            expect(patterns[pattern].match(url)).toBeNull();
        });
    });
});
