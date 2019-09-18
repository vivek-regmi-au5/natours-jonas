const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModels');

dotenv.config({ path: './config.env' });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to mongoDB');
  });

const importDevData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data written Successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const clearData = async () => {
  try {
    await Tour.deleteMany();
    console.log('All data cleared');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importDevData();
} else if (process.argv[2] === '--delete') {
  clearData();
}
