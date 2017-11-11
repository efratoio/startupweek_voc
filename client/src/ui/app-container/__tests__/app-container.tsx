import * as React from "react";
import { AppContainer } from "..";
import { mount } from "enzyme";
import { ApiStore } from "store";
import toJson from "enzyme-to-json";

const someVersion = "v0.0.0";
(window as any)["SOFTWARE_VERSION"] = someVersion;

test("The `AppContainer` component is rendered as expected when the user is logged in", () => {
    const api = tsdi.get(ApiStore);
    api.authToken = "test";
    api.userId = "test";
    const mounted = mount(
        <AppContainer><p>Some Children</p></AppContainer>,
    );
    expect(toJson(mounted)).toMatchSnapshot();
});

test("The `AppContainer` component is rendered as expected when the user is not logged in", () => {
    const mounted = mount(
        <AppContainer><p>Some Children</p></AppContainer>,
    );
    expect(toJson(mounted)).toMatchSnapshot();
});
