const validator = require("../helpers/validate");
const saveStudent = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
    instruments: "array",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const saveSong = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
    featuredIn: "string",
    composer: "required|string",
    aranger: "string",
    lyricist: "string",
    year: "numeric",
    key: "string",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const savePractice = async (req, res, next) => {
  const validationRule = {
    name: "required|numeric",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
module.exports = {
  saveStudent,
  saveSong,
  savePractice,
};
