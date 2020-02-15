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

module.exports = { Review } 