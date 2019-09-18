const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appErrors');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestedAt = new Date().toDateString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Cannot find ${req.originalUrl} on this server`
  // });
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

// const getUser = (req, res) => {
//   res.status(201).json({
//     status: 'success',
//     data: {
//       user
//     }
//   });
// };

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
