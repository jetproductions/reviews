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

Review.hasMany(ReviewPhotos, { foreignKey: 'review_id' })
ReviewPhotos.belongsTo(Review, { foreignKey: 'review_id' })

module.exports = { Review, ReviewPhotos } 