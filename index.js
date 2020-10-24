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
var env = process.env.NODE_ENV == "Development" ? "http://localhost:1337" : process.env.SERVER;
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

app.get("/the-bps-difference", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/the-bps-difference");
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.render("the-bps-difference", {
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

app.get("/leadership", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/leadership");
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.render("leadership", {
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

app.get("/admission-faq", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/admission-faq");
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.render("admission-faq", {
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

app.get("/apply", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/apply-now");
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.render("apply", {
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

app.get("/home", async (req, res) => {
  try {
    // const response = await axios.get("http://localhost:1337/apply-now");
    // console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.render("home", {
      // data: response.data,
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

app.get("/tuition-fees", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/tuition-fees");
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.render("tuition-fees", {
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

app.get("/a-rich-history", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/a-rich-history");
    console.log(response.data, process.env.NODE_ENV);
    res.render("a-rich-history", {
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

app.get("/lower-school", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/lower-school");
    console.log(response.data, process.env.NODE_ENV);
    res.render("lower-school", {
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

app.get("/middle-school", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/middle-school");
    console.log(response.data, process.env.NODE_ENV);
    res.render("middle-school", {
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

app.get("/student-resources", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/student-resources");
    console.log(response.data, process.env.NODE_ENV);
    res.render("student-resources", {
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

app.get("/upper-school", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/upper-school");
    console.log(response.data, process.env.NODE_ENV);
    res.render("upper-school", {
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

app.get("/athletics", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/athletic");
    console.log(response.data, process.env.NODE_ENV);
    res.render("athletic", {
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

app.get("/faculty", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/faculty");
    console.log(response.data, process.env.NODE_ENV);
    res.render("faculty", {
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

app.get("/parent", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/parents");
    console.log(response.data, process.env.NODE_ENV);
    res.render("parent", {
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

app.get("/student", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/student");
    console.log(response.data, process.env.NODE_ENV);
    res.render("student", {
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

app.get("/alumni", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/alumni");
    console.log(response.data, process.env.NODE_ENV);
    res.render("alumni", {
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


app.get("/forms-certificates", async (req, res) => {
  try {
    // const response = await axios.get("http://localhost:1337/a-rich-history");
    // console.log(response.data, process.env.NODE_ENV);
    res.render("forms-certificates", {
      // data: response.data,
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
app.get("/common-page", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/common-page");
    console.log(response.data, process.env.NODE_ENV);
    res.render("common-page", {
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

app.get("/creative-arts", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/Creative-Arts");
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
    res.render("creative-arts", {
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

app.get("/community-outreach", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/Community-Outreach");
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
    res.render("community-outreach", {
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

app.get("/outdoor-education", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/Outdoor-Education");
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
    res.render("outdoor-education", {
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

app.get("/employment", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/employment");
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
    res.render("employment", {
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

app.get("/life-at-bps", async (req, res) => {
  try {
    // const response = await axios.get("http://localhost:1337/Outdoor-Education");
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
    res.render("life-at-bps", {
      // data: response.data,
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

app.listen(3000, () => console.log("app listening on port 3000!"));
