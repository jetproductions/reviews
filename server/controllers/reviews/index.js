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

const meta = (req, res, next) => {
  const { product } = req.params
  res.send(`list route for /reviews/${product}/list`)
}

module.exports = { index, list, meta }