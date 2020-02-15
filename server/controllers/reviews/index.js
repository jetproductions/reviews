const { reviews } = require('../../models')

const index = (req, res) => res.send('index route for /api/reviews')

const list = async (req, res, next) => {
  const { product } = req.params
  try{
    const entries = await reviews.findAll(product)
    res.status(200).json(entries)
  }catch(err){
    console.log(err)
    next(err)
  }
}

const meta = async (req, res, next) => {
  const { product } = req.params
  try{
    const counts = await reviews.ratings(product)
    const ratings = counts.map(({ rating, count }) => ({ [rating]: count })).reduce((acc, curr) => ({ ...acc, ...curr}), {})
    res.status(200).json(ratings)
  }catch(err){
    console.log(err)
    next(err)
  }
}

module.exports = { index, list, meta }