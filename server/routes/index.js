const router = require('express').Router()
const reviews = require('./reviews')

router.get('/', (req, res) => res.send('API Route'))
router.use('/reviews', reviews)

module.exports = router