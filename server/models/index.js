const { Review, ReviewPhotos, Characteristic, ReviewCharacteristics } = require('../db')
const Sequelize = require('sequelize')

const reviews = {
  findAll: (product) => {
    return Review.findAll({
      where: {
        product_id: product,
        reported: false 
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
      attributes: [['characteristic_id', 'id'], [Sequelize.literal('"characteristic"."name"'), 'name'], [Sequelize.fn('AVG', Sequelize.col('value')), 'value']],
      where: {
        '$characteristic.product_id$': product
      },
      include: [{
        attributes: [],
        model: Characteristic
      }],
      group: ['characteristic_id', 'name'],
      raw: true
    })
  },
  create: (review) => {
    const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = review
    const chars = Object.keys(characteristics).map(key => ({ characteristic_id: key, value: characteristics[key] }))
    const urls = photos.map(url => ({ url }))
    const instance = Review.build({
      product_id,
      rating,
      summary,
      body,
      recommend,
      reviewer_name: name,
      reviewer_email: email,
      photos: urls,
      characteristics_reviews: chars
    }, {
      include: [{
        association: Review.Photos,
        as: 'photos'
      }, {
        association: Review.Characteristics
      }]
    })
    return instance.save() 
  },
  updateHelpful: (id) => {
    return Review.update({
      helpfulness: Sequelize.literal('helpfulness + 1')
    }, {
      where: {
        id
      }
    })
  },
  updateReport: (id) => {
    return Review.update({
      reported: true 
    }, {
      where: {
        id
      }
    })
  }
}

module.exports = { reviews }