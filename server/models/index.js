const { Review } = require('../db')

const reviews = {
  findAll: (product) => {
    return Review.findAll({
      where: {
        product_id: product 
      },
      limit: 10
    })
  }
}

module.exports = { reviews }