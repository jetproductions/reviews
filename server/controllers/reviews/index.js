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
    const ratingCount = await reviews.ratings(product)
    const ratings = ratingCount.map(({ rating, count }) => ({ [rating]: count })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
    const recommendCount = await reviews.recommended(product)
    const recommended = recommendCount.map(({ recommend, count }) => ({ [Number(recommend)]: count })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
    const characteristicMeta = await reviews.characteristics(product) 
    const characteristics = characteristicMeta.map(({id, value}) => ({[id]: Number.parseFloat(value).toFixed(2)})).reduce((acc, curr) => ({...acc, ...curr}), {})
    const result = {
      product_id: product,
      ratings,
      recommended,
      characteristics
    }
    res.status(200).json(result)
  }catch(err){
    console.log(err)
    next(err)
  }
}

const add = async (req, res, next) => {
  const { product } = req.params
  const { body: review } = req
  try{
    const created = await reviews.create({ product_id: product, ...review})
    res.json(created.toJSON())
  }catch(err){
    console.log(err)
    next(err)
  }
}

module.exports = { index, list, meta, add }