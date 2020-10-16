require("./common");
const express = require("express");
const axios = require("axios");
const handler = require('./handle');
const app = express();
var commons;
// var classy = require("markdown-it-classy"),
 var MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();
  const markdownItAttrs = require('markdown-it-attrs');

md.use(markdownItAttrs);

// md.use(classy);
var env = process.env.NODE_ENV == "Development" ? "http://localhost:1337" : "";
app.set("view engine", "ejs");
app.use(express.static("public", { index: false }));
app.use(async (req, res, next) => {

  try {
   commons = await axios.get("http://localhost:1337/shared");
  } catch (error) {
    console.log("unable to get common data", error);
  }
  next();
})

// app.get('/uploads/*', async(req, res) => {
//     try {
//         const response = await axios.get(`http://localhost:1337${req.url}`);
//         res.send(response);
//         // console.log(response.data);
//         // res.render('bps_home', { faq: response.data })
//     } catch (error) {
//         console.error(error);
//     }
// })
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/home");
    console.log(commons.data);
    res.render("bps_home", {
      data: response.data,
      md: md,
      common: commons.data,
      env: env,
      handler : handler,
      quality : "large"
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/mission", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/mission");
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.render("mission", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler : handler,
      quality : "large"
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/explore-campus", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/explore-campus");
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.render("explore-campus", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler : handler,
      quality : "large"
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/explore-campus/slides", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/explore-campus");
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.send(response.data.Legends);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => console.log("app listening on port 3000!"));
