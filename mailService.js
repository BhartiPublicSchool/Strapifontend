const nodemailer = require("nodemailer");
const axios = require("axios");
const { getContactMailHtml, getFormTypeMailHtml } = require("./util");

// if(process.env.NODE_ENV != "PROD") {
API_ENDPOINT = "http://206.189.133.72:81";

var smtpTransport = nodemailer.createTransport({
  // service: "Gmail",
  host: process.env.MAILHOST,
  port: process.env.MAILPORT,
  // secure: true,
  auth: {
    user: process.env.MAILID,
    pass: process.env.MAILIDP,
  },
});

exports.contact = async (req, res) => {
  let student = req.body;
  var message = "";
  var emailReceiverList = [];
  let isSVSchool = true;
  if (student.formType === "contact") {
    if(!student.sName || !student.email || !student.message ||!student.phone) {
      return res.status(400).send({
        success: false,
        msg: "invalid input provided.",
      });
    }
    const response = await axios.get(`${API_ENDPOINT}/email-recipients`);
    // Get the list
    if (student.school == "BPS, Swasthya Vihar") {
      emailReceiverList = response.data.filter((s) => s.email.includes("sv"));
    } else {
      isSVSchool = false;
      emailReceiverList = response.data.filter((s) => s.email.includes("mv"));
    }
    message = getContactMailHtml(student, isSVSchool);

  } else {
    if(!student.email || !student.phone || !student.aadharNumber || !student.docType) {
      return res.status(400).send({
        success: false,
        msg: "invalid input provided.",
      });
    }
    const response = await axios.get(`${API_ENDPOINT}/email-forms`);
    message = getFormTypeMailHtml(student);
    emailReceiverList = response.data;
  }

  try {
    firstSuccess = false;
    let result = [];
    emailReceiverList.forEach(async (element, index) => {
      if ("email" in element) {
        console.log("____", element.email);
        var mailOptions = {
          from: process.env.MAILID,
          to: element.email,
          subject: student.sName + " | Has a Query !",
          html: message
        };
        try {
          if (index == 0) {
            let temp = await sendMail(mailOptions);
            result.push(temp);
            if (temp) {
              firstSuccess = true;
              res.send({
                success: true,
                msg: "Thanks For contacting us. we will contact you soon.",
              });
            }
          } else {
            result.push(sendMail(mailOptions));
          }
        } catch (error) {
          console.log(`Error Sending Mail to  ${element.email} ::  ${error}`);
        }
      }
    });
    Promise.all(result)
      .then((r) => {
        if (r && r[0]) {
          try {
            res.send({
              success: true,
              msg: "Thanks For contacting us. we will contact you soon.",
            });
          } catch (error) {}
        }
      })
      .catch((error) => {
        try {
        } catch (error) {
          if (firstSuccess) {
            res.send({
              success: true,
              msg: "Thanks For contacting us. we will contact you soon.",
            });
          } else {
            res.send({
              success: false,
              msg: "Unable to submit, Please Try Again.",
            });
          }
        }
      });
  } catch (error) {
    console.log(error);
  }
};

function sendMail(params) {
  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(params, function (error, response) {
      if (error) {
        reject(false);
        console.log(error);
      } else {
        console.log(response);
        resolve(true);
      }
    });
  });
}

// async function getSVMails(params) {
//   const response = await axios.get(`${API_ENDPOINT}/email-recipients`);
// }

// async function getMVMails(params) {
//   const response = await axios.get(`${API_ENDPOINT}/email-forms`);

// }
