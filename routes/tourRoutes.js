const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkId);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/get-top-tours')
  .get(tourController.alisaTopTours, tourController.getAllTours);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
