require("./common");
const express = require("express");
const axios = require("axios");
const path = require('path');
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

// md.use(classy);
// var API_ENDPOINT = "";
// if(process.env.NODE_ENV != "PROD") {
API_ENDPOINT = "http://localhost:1337";
env = API_ENDPOINT;
// env = "http://localhost:1337";
// } else {
//   API_ENDPOINT = "http://localhost:1337";
//   env = "";
// }
// var env = process.env.NODE_ENV == "Development" ? `${API_ENDPOINT}` : "";
app.set("view engine", "ejs");
app.use(express.static("public", { index: false }));
app.use(async (req, res, next) => {
  try {
    commons = await axios.get(`${API_ENDPOINT}/shared`);
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
    console.log(commons.data);
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
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
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
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
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
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
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
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
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
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
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
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
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
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
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
    // console.log(response.data, process.env.NODE_ENV);
    console.log(env);
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
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    // console.log(response.data, process.env.NODE_ENV);
    res.send(response.data.alumni_gallery);
  } catch (error) {
    console.error(error);
  }
});

app.get("/forms-certificates", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/heading-And-text`);
    // console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
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
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.send(response.data.Legends);
  } catch (error) {
    console.error(error);
  }
});

app.get("/news-announcement/modals", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/home`);
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
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
    console.log(response.data, process.env.NODE_ENV);
    console.log(env);
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/creative-arts", async (req, res) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/Creative-Arts`);
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
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
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
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
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
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
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
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
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
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
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
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
    // console.log(response.data, process.env.NODE_ENV);
    // console.log(env);
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

app.get('*', function(req, res){
  console.log(__dirname);
  var options = { 
    root: path.join(__dirname, 'public') 
}; 
  
var fileName = 'not-found.html'; 
  res.status(404).sendFile(fileName, options, function (err) { 
    if (err) { 
       console.log(err);
    } else { 
        console.log('Sent:', fileName); 
    } 
}); 
});

app.listen(3000, () => console.log("app listening on port 3000!"));
