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
      attributes: [['characteristic_id', 'id'], [Sequelize.fn('AVG', Sequelize.col('value')), 'value']],
      where: {
        '$characteristic.product_id$': product
      },
      include: [{
        attributes: [],
        model: Characteristic
      }],
      group: ['characteristic_id'],
      raw: true
    })
  },
  create: (review) => {
    const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = review
    const urls = photos.map(url => ({ url }))
    const instance = Review.build({
      product_id,
      rating,
      summary,
      body,
      recommend,
      reviewer_name: name,
      reviewer_email: email,
      photos: urls 
    }, {
      include: [{
        association: Review.Photos,
        as: 'photos'
      }]
    })
    return instance.save() 
  }
}

module.exports = { reviews }