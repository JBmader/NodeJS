const express = require("express");
const Router = express.Router();

const f_welcome = () => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Welcome !</title>
        </head>
        <body>
          <h1>Welcome !</h1>
          <p>You can try hello going to <a href="/hello?name=anonymous" >this page</a>. </br></p>
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

const f_g = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Hello world!</title>
      </head>
      <body>
        <h1>Hello JB, you're the designer of this nodejs server</h1>
      </body>
    </html>
  `;
};

Router.get("/", (req: any, res: any) => {
  res
    .type("html")
    .status(200)
    .send(f_welcome());
});

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
export default Router;
