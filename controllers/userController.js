const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8')
);

exports.checkId = (req, res, next, val) => {
  console.log(`The requested id is ${val}`);
  if (req.params.id * 1 > users.length) {
    return res.status(404).json({
      status: 'error',
      message: 'InvalidId'
    });
  }
  next();
};

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
