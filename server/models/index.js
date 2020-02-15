const { Review, ReviewPhotos } = require('../db')

const reviews = {
  findAll: (product) => {
    return Review.findAll({
      where: {
        product_id: product 
      },
      include: [ReviewPhotos],
      limit: 10
    })
  }
}

module.exports = { reviews }