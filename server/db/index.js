const Sequelize = require('sequelize');
 
const db = new Sequelize('reviews', 'tthenne', '', {
  dialect: 'postgres'
})
 
const Review = db.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rating: Sequelize.INTEGER,
  date: Sequelize.DATEONLY,
  summary: Sequelize.STRING,
  body: Sequelize.STRING,
  recommend: Sequelize.BOOLEAN,
  reported: Sequelize.BOOLEAN,
  reviewer_name: Sequelize.STRING,
  reviewer_email: Sequelize.STRING,
  response: Sequelize.STRING,
  helpfulness: Sequelize.INTEGER
}, {
  timestamps: false
})

const ReviewPhotos = db.define('reviews_photos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  review_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  url: Sequelize.STRING
}, {
  timestamps: false
})

const Characteristic = db.define('characteristics', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  product_id: {
    type: Sequelize.INTEGER,
  },
  name: {
      type: Sequelize.STRING
  }
}, {
  timestamps: false
})

const ReviewCharacteristics = db.define('characteristics_reviews', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  review_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  characteristic_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
})

Review.hasMany(ReviewPhotos, { as: 'photos', foreignKey: 'review_id' })
ReviewPhotos.belongsTo(Review, { foreignKey: 'review_id' })

Characteristic.hasMany(ReviewCharacteristics, { foreignKey: 'characteristic_id' })
ReviewCharacteristics.belongsTo(Characteristic, { foreignKey: 'characteristic_id' })

module.exports = { Review, ReviewPhotos, ReviewCharacteristics, Characteristic } 