const nodemailer = require("nodemailer");
const axios = require("axios");
console.log(process.env.MAILID);

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
  console.log(req.body);
  let student = req.body;
  var message = "";
  //   var message = JSON.stringify(req.body);
  var emailReceiverList = [];

  if (student.formType === "contact") {
    const response = await axios.get(`${API_ENDPOINT}/email-recipients`);
    message = ` Student Name :  ${student.sName}
                City :      ${student.city}
                Email :    ${student.email}
                Phone :    ${student.phone}
                school :   ${student.school}
                Grade :    ${student.std}
                message:   ${student.message}`;

                // Get the list 
                if (student.school == "BPS, Swasthya Vihar") {
                  console.log("bpssv");
                  emailReceiverList = response.data.filter(s => s.email.includes("sv"));
                  // console.log("send to ::::",mails[0].email);
                } else {
                  emailReceiverList = response.data.filter(s => s.email.includes("mv"));
                  console.log("mv bps");
                }
                console.log(student.school);
  } else {
    const response = await axios.get(`${API_ENDPOINT}/email-forms`);
    message = ` Student Name :  ${student.sName}
                fatherName:     ${student.fatherName},
                motherName:     ${student.motherName},
                aadharNumber:   ${student.aadharNumber},
                studentType:    ${student.studentType},
                email:          ${student.email},
                class/division: ${student.class_division},
                passingYear:    ${student.passingYear},
                docType:        ${student.docType},
                phone:          ${student.phone},
                cbseRollNo:     ${student.cbseRollNo},
                formType:       Forms & Certificate
    `;
    emailReceiverList = response.data;
    // console.log(emailReceiverList);
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
          text: message,
        };
        try {
          if (index == 0) {
            let temp = await sendMail(mailOptions);
            if (temp) {
              firstSuccess = true;
            }
          }else {
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
          res.send({
            success: true,
            msg: "Thanks For contacting us. we will contact you soon.",
          });
        }
      })
      .catch((error) => {
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