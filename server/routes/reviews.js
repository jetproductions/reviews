const router = require('express').Router()
const { index, list, meta } = require('../controllers/reviews')

router.get('/', index)
router.get('/:product/list', list)
router.get('/:product/meta', meta)

module.exports = router