const { Review, ReviewPhotos } = require('../db')
const Sequelize = require('sequelize')

const reviews = {
  findAll: (product) => {
    return Review.findAll({
      where: {
        product_id: product 
      },
      include: [{
        model: ReviewPhotos,
        attributes: ['id', 'url'],
        as: 'photos'
      }],
      limit: 10
    })
  },
  ratings: (product) => {
    return Review.findAll({
      attributes: ['rating', [Sequelize.fn('count', Sequelize.col('*')), 'count']],
      where: {
        product_id: product 
      },
      group: ['reviews.rating'],
      raw: true
    })
  }
}

module.exports = { reviews }