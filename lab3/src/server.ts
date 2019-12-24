import express = require("express");
import { MetricsHandler } from "./metrics";
import handles from "./handles";
import path from "path";
const dbMet: MetricsHandler = new MetricsHandler("./metrics");
const app = express();
const metrics = require("./metrics");
const port: string = process.env.PORT || "8080";

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", handles);
app.get("/metrics/:id", (req: any, res: any) => {

  dbMet.getOne(req.params.id,(err: Error | null, result?: any) => {
    if (err) {
      res.status(500).send(err);
    }
    else res.status(200).send(result);
  });
});

app.get("/metrics", (req: any, res: any) => {
  dbMet.get((err: Error | null, result?: any) => {
    if (err) {
      res.status(500).send(err);
    }
    else res.status(200).send(result);
  });
});

app.post("/metrics/:id", (req: any, res: any) => {
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) res.status(500).send(err);
    res.status(200).send();
  });
});

app.delete("/metrics/:id", (req: any, res: any) => {
  dbMet.delete(req.params.id, (err: Error | null, result: any) => {
    if(err) res.status(500).send({err: err});
    else res.status(200).send("saved");
  })
})

app.listen(port, (err: Error) => {
  if (err) {
    throw err;
  }
  console.log(`server's listening on http://localhost:${port}`);
});
