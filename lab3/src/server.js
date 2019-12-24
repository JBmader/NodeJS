"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var metrics_1 = require("./metrics");
var handles_1 = __importDefault(require("./handles"));
var path_1 = __importDefault(require("path"));
var dbMet = new metrics_1.MetricsHandler("./metrics");
var app = express();
var metrics = require("./metrics");
var port = process.env.PORT || "8080";
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(path_1.default.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", handles_1.default);
app.get("/metrics/:id", function (req, res) {
    dbMet.getOne(req.params.id, function (err, result) {
        if (err) {
            res.status(500).send(err);
        }
        else
            res.status(200).send(result);
    });
});
app.get("/metrics", function (req, res) {
    dbMet.get(function (err, result) {
        if (err) {
            res.status(500).send(err);
        }
        else
            res.status(200).send(result);
    });
});
app.post("/metrics/:id", function (req, res) {
    dbMet.save(req.params.id, req.body, function (err) {
        if (err)
            res.status(500).send(err);
        res.status(200).send();
    });
});
app.delete("/metrics/:id", function (req, res) {
    dbMet.delete(req.params.id, function (err, result) {
        if (err)
            res.status(500).send({ err: err });
        else
            res.status(200).send("saved");
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server's listening on http://localhost:" + port);
});
