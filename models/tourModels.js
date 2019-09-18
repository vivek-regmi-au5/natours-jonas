const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'A tour must have a description'],
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      require: [true, 'A tour must have max group size']
    },
    difficulty: {
      type: String
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a type']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    secretTour: {
      type: Boolean,
      default: false
    },
    image: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    rating: {
      type: Number,
      default: 4.5
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
// virtual properties
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// document middleware, it only runs for save and create command
// Creating a slug from the name string
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// Query Middleware

tourSchema.pre(/^find/, function(next) {
  this.start = Date.now();
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`The query took ${Date.now() - this.start} milliseconds `);
  // console.log(docs[0]);
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
