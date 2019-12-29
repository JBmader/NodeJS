const express = require("express");
const Router = express.Router();

const f_welcome = () => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Project</title>
        </head>
        <body>
          <h1>Welcome to our project!</h1>
          <p>
            Hello page: <a href="/hello?name=anonymous" >this page</a>. </br>
            Home page: <a href="/home" >this page</a>. </br>
            Display page: <a href="/display"> this page</a>. </br>
          </p>
        </body>
      </html>
    `;
};

const f_404 = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Page not found</title>
      </head>
      <body>
        <h1>Error 404 : Page not found</h1>
      </body>
    </html>
  `;
};

/*
Router.get("/", (req: any, res: any) => {
  res
    .type("html")
    .status(200)
    .send(f_welcome());
}); */

Router.get("/hello", (req: any, res: any) => {
  if (req.query.name) {
    res.render("hello.ejs", {
      name:
        req.query.name === "JB"
          ? "JB, designer of this page"
          : req.query.name
    });
  } else {
    res
      .type("html")
      .status(404)
      .send(f_404());
  }
});

Router.get("/", (req: any, res: any) => {
  res
    .render("home.ejs");
});

Router.get("/signup", (req: any, res: any) => {
  res
    .render("signup.ejs");
});

Router.get("/display", (req: any, res: any) => {
  res
    .render("display.ejs");
});
module.exports = Router;
