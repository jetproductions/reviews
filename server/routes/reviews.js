const router = require('express').Router()
const { index, list, meta, add, helpful, report } = require('../controllers/reviews')

router.get('/', index)
router.get('/:product/list', list)
router.get('/:product/meta', meta)
router.post('/:product', add)
router.put('/helpful/:review', helpful)
router.put('/report/:review', report)

module.exports = router