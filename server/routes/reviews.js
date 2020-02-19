const router = require('express').Router()
const { index, list, meta, add } = require('../controllers/reviews')

router.get('/', index)
router.get('/:product/list', list)
router.get('/:product/meta', meta)
router.post('/:product', add)

module.exports = router