require("./common");
const express = require("express");
const axios = require("axios");
const path = require("path");
const handler = require("./handle");
const mailer = require("./mailService");
const bodyParser = require("body-parser");
const app = express();
var commons;
// var classy = require("markdown-it-classy"),
var MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();
const markdownItAttrs = require("markdown-it-attrs");
const underline = require("markdown-it-underline");
md.use(underline);

md.use(markdownItAttrs);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API_ENDPOINT = "http://localhost:1337/api";
// env = API_ENDPOINT;
API_ENDPOINT = "https://admin.bps.edu.in";
// env = API_ENDPOINT;

var env = process.env.NODE_ENV == "Development" ? `${API_ENDPOINT}` : "";

app.set("view engine", "ejs");
app.use(express.static("public", { index: false }));
app.use(async (req, res, next) => {
  try {
    commons = await axios.get(`${API_ENDPOINT}/shared`);
    console.log(commons);
    
  } catch (error) {
    console.log("unable to get common data", error);
  }
  next();
});

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
app.get("/home", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/home`);
    res.render("bps_home", {
      data: response.data,
      md: md,
      common: commons.data,
      env: env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/mission", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/mission`);
    res.render("mission", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/site-map", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/site-map`);
    res.render("site-map", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/explore-campus", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/explore-campus`);

    res.render("explore-campus", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/the-bps-difference", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/the-bps-difference`);

    res.render("the-bps-difference", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/leadership", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/leadership`);

    res.render("leadership", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/admission-faq", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/admission-faq`);

    res.render("admission-faq", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/apply", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/apply-now`);

    res.render("apply", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/landing-page`);
    //

    res.render("home", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/tuition-fees", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/tuition-fees`);

    res.render("tuition-fees", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/a-rich-history", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/a-rich-history`);

    res.render("a-rich-history", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/lower-school", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/lower-school`);

    res.render("lower-school", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/middle-school", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/middle-school`);

    res.render("middle-school", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/contact", mailer.contact);

app.get("/student-resources", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/student-resources`);

    res.render("student-resources", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/upper-school", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/upper-school`);

    res.render("upper-school", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/athletics", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/athletic`);

    res.render("athletic", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/faculty", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/faculty`);

    res.render("faculty", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/contact", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/contact`);

    res.render("contact", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/parent", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/parents`);

    res.render("parent", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/student", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/student`);

    res.render("student", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/alumni", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/alumni`);

    res.render("alumni", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/alumni/modals", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/alumni`);
    //
    res.send(response.data.alumni_gallery);
  } catch (error) {
    console.error(error);
  }
});

app.get("/forms-certificates", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/heading-And-text`);
    //
    res.render("forms-certificates", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});
app.get("/academics", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/common-page`);

    res.render("common-page", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/explore-campus/slides", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/explore-campus`);

    res.send(response.data.Legends);
  } catch (error) {
    console.error(error);
  }
});

app.get("/news-announcement/modals", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/home`);

    let modals = [];
    response.data.NewsAndAnnouncement.forEach((element) => {
      modals.push(element.modal);
    });
    res.send(modals);
  } catch (error) {
    console.error(error);
  }
});

app.get("/search", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/searches`);

    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/creative-arts", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/Creative-Arts`);
    //
    //
    res.render("creative-arts", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/community-outreach", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/Community-Outreach`);
    //
    //
    res.render("community-outreach", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/outdoor-education", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/Outdoor-Education`);
    //
    //
    res.render("outdoor-education", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/employment", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/employment`);
    //
    //
    res.render("employment", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/life-at-bps", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/life-at-bps`);
    //
    //
    res.render("life-at-bps", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/beyond-books", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/beyond-books`);
    //
    //
    res.render("beyond-books", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/landing-page", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/landing-page`);
    //
    //
    res.render("landing-page", {
      data: response.data,
      common: commons.data,
      md,
      env,
      handler: handler,
      quality: "large",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("*", function (req, res) {
  console.log(__dirname);
  var options = {
    root: path.join(__dirname, "public"),
  };

  var fileName = "not-found.html";
  res.status(404).sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.listen(3000, () => console.log("app listening on port 3000!"));
