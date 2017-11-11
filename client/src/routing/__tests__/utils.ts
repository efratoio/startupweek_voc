import { parseRoute } from "../utils";

["/login", "/signup", "/dashboard", "/unknown"].forEach(route => {
    test(`The route parsing utility detects "${route}" correctly`, () => {
        expect(parseRoute(route)).toMatchSnapshot();
    });
});
