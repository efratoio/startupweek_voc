import * as routes from "../routes";

["routeLogin", "routeDashboard", "routeSignup"].forEach(route => {
    test(`The route "${route}" returns the correct route`, () => {
        expect(routes[route]()).toMatchSnapshot();
    });
});
