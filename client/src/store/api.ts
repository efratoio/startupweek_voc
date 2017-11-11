import { observable, computed, action } from "mobx";
import { bind } from "bind-decorator";
import * as isomorphicFetch from "isomorphic-fetch";
import { RequestStatus } from "request-status";
import { History } from "history";
import { routeDashboard } from "routing";
import { component, inject, initialize } from "tsdi";
import { login } from "api";

declare var baseUrl: string;
const prefixedBaseUrl = `${window.location.protocol}//${baseUrl}`;

const softwareVersion = 2;
const localStorageIdentifier = "software-login";

interface LocalStorageApi {
    storageVersion: number;
    date: string;
    authToken: string;
}

interface ApiError {
    message: string;
}

interface RequestMetaInfo {
    error?: ApiError;
    requestStatus: RequestStatus;
}

@component
export class ApiStore {
    @inject private browserHistory: History;

    @observable public authToken: string;
    @observable public requests: Map<string, RequestMetaInfo> = new Map();
    @observable public errors: ApiError[] = [];

    @initialize
    protected init() {
        this.load();
    }

    @computed
    public get loggedIn() {
        return typeof this.authToken !== "undefined";
    }

    @bind @action
    public async call<T>(identifier: string, request: () => Promise<T>, supressErrors = false): Promise<T> {
        try {
            this.requests.set(identifier,{ requestStatus: RequestStatus.IN_PROGRESS });
            const response = await request();
            this.requests.set(identifier, { requestStatus: RequestStatus.SUCCESS });
            return response as T;
        } catch (error) {
            this.requests.set(identifier, { requestStatus: RequestStatus.FAIL, error });
            if (!supressErrors) {
                this.errors.push(error);
            }
            return undefined;
        }
    }

    @bind @action
    public async doLogin(username: string, password: string) {
        const body = { username, password };
        const response = await this.call(
            "doLogin",
            () => login(username, password),
            true,
        );
        if (response) {
            const { token } = response;
            this.authToken = token;
            this.save();
            this.browserHistory.replace(routeDashboard());
        }
    }

    @bind @action
    public logout() {
        this.clearStorage();
        this.authToken = undefined;
    }

    @bind
    private save() {
        const deserialized: LocalStorageApi = {
            storageVersion: softwareVersion,
            date: new Date().toString(),
            authToken: this.authToken,
        };
        const serialized = JSON.stringify(deserialized);
        localStorage.setItem(localStorageIdentifier, serialized);
    }

    @bind
    private clearStorage() {
        localStorage.removeItem(localStorageIdentifier);
    }

    @bind
    private load() {
        const serialized = localStorage.getItem(localStorageIdentifier);
        if (serialized === null) { // tslint:disable-line
            return;
        }
        let deserialized: LocalStorageApi;
        try {
            deserialized = JSON.parse(serialized);
        } catch (err) {
            this.clearStorage();
            return;
        }
        if (deserialized.storageVersion !== softwareVersion) {
            this.clearStorage();
            return;
        }
        this.authToken = deserialized.authToken;
        this.browserHistory.replace(routeDashboard());
    }

    public getRequestStatus(identifier: string): RequestStatus {
        const request = this.requests.get(identifier);
        if (typeof request === "undefined") {
            return RequestStatus.NONE;
        }
        return request.requestStatus;
    }

    public getError(identifier: string): ApiError {
        const request = this.requests.get(identifier);
        if (typeof request === "undefined") {
            return undefined;
        }
        return request.error;
    }

    @bind @action
    public doDismiss() {
        this.errors.pop();
    }

    @computed
    public get latestError() {
        return this.errors[this.errors.length - 1];
    }
}
