export const getContactMailHtml = (student, isSVSchool = true) => `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Details</title>
  <style>
      body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          margin: 0;
          padding: 0;
      }
      .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
          text-align: center;
          color: #333;
      }
      .student-details {
          margin-bottom: 20px;
      }
      .student-details label {
          font-weight: bold;
          display: inline-block;
          width: 100px; /* Adjust width as needed */
      }
      .student-details p {
          display: inline-block;
          margin: 5px 0;
          vertical-align: top; /* Align content to top */
      }
      .button-row {
          text-align: center;
          margin-top: 40px;
      }
      .button-row a {
        margin-bottom: 20px;
      }
      .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin: 0 5px;
          text-decoration: none;
      }
      .button:hover {
          background-color: #0056b3;
      }
  </style>
  </head>
  <body>
  <div class="container">
      <h1>Student Details</h1>
      <div class="student-details">
          <label for="name">Name:</label>
          <p id="name">${student.sName}</p>
      </div>
      <div class="student-details">
          <label for="email">Email:</label>
          <p id="email">${student.email}</p>
      </div>
      <div class="student-details">
          <label for="city">City:</label>
          <p id="city">${student.city}</p>
      </div>
      <div class="student-details">
          <label for="grade">Grade:</label>
          <p id="grade">${student.std}</p>
      </div>
      <div class="student-details">
          <label for="phone">Phone:</label>
          <p id="phone">${student.phone}</p>
      </div>
      <div class="student-details">
          <label for="school">School:</label>
          <p id="school">${student.school}</p>
      </div>
      <div class="student-details">
          <label for="message">Message:</label>
          <p id="message">${student.message}</p>
      </div>
      <div class="button-row">
          <a class="button" href="https://mail.google.com/mail/?view=cm&fs=1&to=${student.email}&su=BPS%20${isSVSchool ? "SV" : "MV"}%20Inquiry!&body=Thank%20you%20for%20contacting%20us!%20We%20will%20be%20in%20touch%20shortly,%20but%20you%20may%20also%20find%20answers%20to%20some%20of%20your%20questions%20on%20our%20FAQ%20page%20at%20https://bps.edu.in/admission-faq%20&cc=info@bps.edu.in,admissions.sv@bps.edu.in">Desktop Reply</a>
          <a class="button" href="mailto:${student.email}?Subject=BPS%20${isSVSchool ? "SV" : "MV"}%20Inquiry!&body=Thank%20you%20for%20contacting%20us!%20We%20will%20be%20in%20touch%20shortly,%20but%20you%20may%20also%20find%20answers%20to%20some%20of%20your%20questions%20on%20our%20FAQ%20page%20at%20https://bps.edu.in/admission-faq%20&cc=info@bps.edu.in,admissions.sv@bps.edu.in">Mobile Reply</a>
      </div>
  </div>
  </body>
  </html>`;

  export const getFormTypeMailHtml = (student) => `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Details</title>
  <style>
      body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          margin: 0;
          padding: 0;
      }
      .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
          text-align: center;
          color: #333;
      }
      .student-details {
          margin-bottom: 20px;
      }
      .student-details label {
          font-weight: bold;
          display: inline-block;
          width: 100px; /* Adjust width as needed */
      }
      .student-details p {
          display: inline-block;
          margin: 5px 0;
          vertical-align: top; /* Align content to top */
      }
      .button-row {
          text-align: center;
          margin-top: 40px;
      }
      .button-row a {
        margin-bottom: 20px;
      }
      .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin: 0 5px;
          text-decoration: none;
      }
      .button:hover {
          background-color: #0056b3;
      }
  </style>
  </head>
  <body>
  <div class="container">
      <h1>Student Details</h1>
      <div class="student-details">
          <label for="name">Name:</label>
          <p id="name">${student.sName}</p>
      </div>
      <div class="student-details">
          <label for="fName">Father Name:</label>
          <p id="fName">${student.fatherName}</p>
      </div>
      <div class="student-details">
          <label for="mName">Mother Name:</label>
          <p id="mName">${student.motherName}</p>
      </div>
      <div class="student-details">
          <label for="aNum">Aadhar Number:</label>
          <p id="aNum">${student.aadharNumber}</p>
      </div>
      <div class="student-details">
          <label for="email">Email:</label>
          <p id="email">${student.email}</p>
      </div>
      <div class="student-details">
          <label for="sType">Student Type:</label>
          <p id="sType">${student.studentType}</p>
      </div>
      <div class="student-details">
          <label for="classDivision">Class Division:</label>
          <p id="classDivision">${student.class_division}</p>
      </div>
      <div class="student-details">
          <label for="pYear">Pasing Year:</label>
          <p id="pYear">${student.passingYear}</p>
      </div>
      <div class="student-details">
          <label for="phone">Phone:</label>
          <p id="phone">${student.phone}</p>
      </div>
      <div class="student-details">
          <label for="dType">Doc Type:</label>
          <p id="dType">${student.docType}</p>
      </div>
      <div class="student-details">
          <label for="message">CBSE Roll Number:</label>
          <p id="message">${student.cbseRollNo}</p>
      </div>
      <div class="student-details">
          <label for="message">Form Type:</label>
          <p id="message">Forms & Certificate</p>
      </div>
      <div class="button-row">
          <a class="button" href="https://mail.google.com/mail/?view=cm&fs=1&to=${student.email}&su=BPS%20Inquiry!&body=Thank%20you%20for%20contacting%20us!%20We%20will%20be%20in%20touch%20shortly,%20but%20you%20may%20also%20find%20answers%20to%20some%20of%20your%20questions%20on%20our%20FAQ%20page%20at%20https://bps.edu.in/admission-faq%20&cc=info@bps.edu.in,admissions.sv@bps.edu.in">Desktop Reply</a>
          <a class="button" href="mailto:${student.email}?Subject=BPS%20Inquiry!&body=Thank%20you%20for%20contacting%20us!%20We%20will%20be%20in%20touch%20shortly,%20but%20you%20may%20also%20find%20answers%20to%20some%20of%20your%20questions%20on%20our%20FAQ%20page%20at%20https://bps.edu.in/admission-faq%20&cc=info@bps.edu.in,admissions.sv@bps.edu.in">Mobile Reply</a>
      </div>
  </div>
  </body>
  </html>`;