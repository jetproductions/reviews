const { Review, ReviewPhotos, Characteristic, ReviewCharacteristics } = require('../db')
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
  },
  recommended: (product) => {
    return Review.findAll({
      attributes: ['recommend', [Sequelize.fn('count', Sequelize.col('*')), 'count']],
      where: {
        product_id: product 
      },
      group: ['reviews.recommend'],
      raw: true
    })
  },
  characteristics: (product) => {
    return ReviewCharacteristics.findAll({
      attributes: ['characteristic_id', [Sequelize.fn('AVG', Sequelize.col('value')), 'value']],
      where: {
        '$characteristic.product_id$': product
      },
      include: [{
        attributes: [],
        model: Characteristic
      }],
      group: ['characteristic_id']
    })
  }
}

module.exports = { reviews }