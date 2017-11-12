import { Request, Response, NextFunction } from "express";
import * as Express from "express";
import * as BodyParser from "body-parser";
import * as HTTP from "http-status-codes";
import { okay, created, notFound } from "./answers";
import { info } from "winston";

const port = 3001;

const http = Express();

function cors(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    return next();
}

function postLogin(req: Request, res: Response) {
    return created(res, {
        token: "12345"
    });
}

function getTransactions(req: Request, res: Response) {
    return okay(res, [
        {
            name: "Transaction 1",
            value: 60,
            organization: "Rewe",
            category: "grocery",
            tags: ["grocery", "debit"]
        },
        {
            name: "Thanks for your Spotify Money",
            value: 10,
            organization: "Paypal",
            category: "media",
            tags: ["spotify", "media", "recurring", "service"]
        },
        {
            name: "Netflix says thanks",
            value: 15,
            organization: "Paypal",
            category: "media",
            tags: ["netflix", "media", "recurring", "service"]
        },
        {
            name: "See you again at Rewe",
            value: 40,
            organization: "Rewe",
            category: "grocery",
            tags: ["grocery", "debit"]
        },
        {
            name: "Miete für November 2017",
            value: 1000,
            organization: "Lars Landlord",
            category: "rent",
            tags: ["rent", "recurring"]
        },
        {
            name: "AOK sagt danke.",
            value: 450,
            organization: "AOK",
            category: "insurance",
            tags: ["insurance", "recurring"]
        },
        {
            name: "Versicherungssumme 2017",
            value: 120,
            organization: "HUK",
            category: "insurance",
            tags: ["insurance", "recurring"]
        },
    ]);
}

http.use(BodyParser.json());
http.use(BodyParser.urlencoded({ extended: true }));
http.use(cors);
http.post("/login", postLogin);
http.get("/transactions", getTransactions);
http.use("*", (request, response) => notFound(response))

http.listen(port);
info(`Server started on port ${port}.`);
