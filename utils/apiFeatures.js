class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryStr = { ...this.queryStr };
    const ignoreStr = ['sort', 'limit', 'fields', 'page'];
    ignoreStr.forEach(element => delete queryStr[element]);
    let queryObj = JSON.stringify(queryStr);
    queryObj = queryObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryObj));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  fieldLimits() {
    if (this.query.fields) {
      const fieldOf = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fieldOf);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginations() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
