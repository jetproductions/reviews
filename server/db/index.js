const Sequelize = require('sequelize');
 
const db = new Sequelize('reviews', 'tthenne', '', {
  dialect: 'postgres'
})
 
const Review = db.define('reviews', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    autoIncrement: true
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
    type: Sequelize.UUID,
    primaryKey: true,
    autoIncrement: true
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
    type: Sequelize.UUID,
    primaryKey: true,
    autoIncrement: true
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
    type: Sequelize.UUID,
    primaryKey: true,
    autoIncrement: true
  },
  review_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  characteristic_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  value: {
    type: Sequelize.INTEGER,
  }
}, {
  timestamps: false
})

Review.Photos = Review.hasMany(ReviewPhotos, { as: 'photos', foreignKey: 'review_id' })
ReviewPhotos.belongsTo(Review, { foreignKey: 'review_id' })

//Need association for create
Review.Characteristics = Review.hasMany(ReviewCharacteristics, { foreignKey: 'review_id'})
ReviewCharacteristics.belongsTo(Review, { foreignKey: 'review_id' })

Characteristic.hasMany(ReviewCharacteristics, { foreignKey: 'characteristic_id' })
ReviewCharacteristics.belongsTo(Characteristic, { foreignKey: 'characteristic_id' })

module.exports = { Review, ReviewPhotos, ReviewCharacteristics, Characteristic } 