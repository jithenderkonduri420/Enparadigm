const db = require("../models");
const Questionnaire = db.questionnaire;
const Survey = db.survey;
const Permissions = db.permissions;
const { validationResult } = require('express-validator');
var bcrypt = require("bcryptjs");
const Excel = require('exceljs')
const _ = require("lodash");
const nodemailer = require('nodemailer');
const path = require('path');
var public = path.join(__dirname, 'public');
const config = require("../config/auth.config");

// create transporter object with smtp server details
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'jithenderkonduri@gmail.com',
    pass: 'dkkqytnhrqjgtumb'
  }
});

exports.create = (req, res, next) => {
  const { questionnaire, dimensionId, blockIndex, options, values } = req.body
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: true, message: errors.array() })
  }

  const q = new Questionnaire({
    questionnaire,
    options,
    values
  });

  q.save((err, user) => {
    if (err) res.status(500).send({ error: true, message: err });
    res.send({ message: "Questionnaire was created successfully!" });
  });

};

exports.update = async (req, res, next) => {
  const { questionnaire, options, values } = req.body
  const q = await Questionnaire.findById(req.params.id);
  // validate
  if (!q) res.status(400).send({ error: true, message: 'Questionnaire not found' });
  q.questionnaire = questionnaire;
  q.options = options;
  q.values = values;

  q.save((err, questionnaire) => {
    if (err) res.status(500).send({ error: true, message: err });
    res.send({ message: "Questionnaire was updated successfully!" });
  });
};
exports.delete = async (req, res, next) => {
  const q = await Questionnaire.findById(req.params.id);
  // validate
  if (!q) res.status(500).send({ error: true, message: 'Questionnaire not found' });

  Questionnaire.findByIdAndRemove(q._id, (err, product) => {
    if (err) res.status(500).send({ error: true, message: err });
    res.send({ message: "Questionnaire was deleted successfully!" });
  });
}
exports.getById = async (req, res, next) => {
  const questionnaire = await Questionnaire.findById(req.params.id).populate("dimensionId");
  // validate
  if (!questionnaire) res.status(400).send({ error: true, message: 'Questionnaire not found' });
  res.status(200).send({ questionnaire });
};
exports.getAll = async (req, res) => {
  try {
    const { type } = req.query;
    let condition = {};
    if ('type' in req.query) condition = { type };
    Questionnaire.find(condition)
      .exec((err, questionnaires) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: true, message: err });
          return;
        }
        res.status(200).send({
          questionnaires,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: true, message: err });
  }
};
exports.survey = async (req, res, next) => {
  const { name, organization, email, questionnaires, location } = req.body
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: true, message: errors.array() })
  }
  const s = new Survey({
    name,
    organization,
    email,
    location,
    questionnaires,
  });
  s.save(async (err, user) => {
    if (err) res.status(500).send({ error: true, message: err });
    // await sendMail(email);
    res.send({ message: s._id });
  });

};
exports.getAllSurvey = async (req, res) => {
  try {
    const { type } = req.query;
    let condition = {};
    Survey.find(condition)
      .exec((err, survey) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: true, message: err });
          return;
        }
        res.status(200).send({
          survey,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: true, message: err });
  }
};

exports.downloadUsers = async (req, res, next) => {
  let data = await Survey.find({});
  let finalResult = await companyAvgScore(data);
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet('Users');
  worksheet.columns = [
    { header: 'Name', key: 'name' },
    { header: 'Organization', key: 'organization' },
    { header: 'Email', key: 'email' },
  ];
  // force the columns to be at least as long as their header row.
  // Have to take this approach because ExcelJS doesn't have an autofit property.
  worksheet.columns.forEach(column => {
    column.width = column.header.length < 12 ? 12 : parseInt(column.header.length) + 5
    if (column.header === 'Email') column.width = parseInt(column.header.length) + 20
  })
  worksheet.getRow(1).font = { bold: true }
  // Dump all the data into Excel
  finalResult.forEach((e, index) => {
    // row 1 is the header.
    const rowIndex = index + 2

    // By using destructuring we can easily dump all of the data into the row without doing much
    // We can add formulas pretty easily by providing the formula property.
    console.log(e);
    worksheet.addRow({
      ...e,
    })
  })

  workbook.xlsx.writeFile('uploads/users.xlsx')
  res.setHeader('Content-Disposition', 'attachment; filename= + Application_Security_Design.xlsx');
  res.setHeader('Content-Type', 'application/vnd.ms-excel');

  let tool5filepath = '/' + decodeURIComponent('uploads/users.xlsx');
  res.download('uploads/users.xlsx');

}
async function sendMail(to) {
  transporter.sendMail({
    to,
    subject: 'An Attached File',
    text: 'Check out this attached pdf file',
    attachments: [{
      filename: 'sample.pdf',
      path: path.join(__dirname, '../../uploads/sample.pdf'),
      contentType: 'application/pdf'
    }],
    function(err, info) {
      if (err) {
        res.status(500).send({ error: true, message: err });
      } else {
        console.log(info);
      }
    }
  });
}
async function companyAvgScore(data) {
  let final = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    let obj = {
      name: element.name,
      organization: element.organization,
      email: element.email,
    }
    final[index] = obj;
  }
  return final;
}



