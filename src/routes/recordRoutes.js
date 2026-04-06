const router = require('express').Router();
const { createRecord, getRecords, updateRecord, deleteRecord } = require('../controllers/recordController');
const { auth, allowRoles } = require('../middlewares/authMiddleware');

router.post('/', auth, allowRoles('admin'), createRecord);
router.get('/', auth, allowRoles('admin', 'analyst', 'viewer'), getRecords);
router.put('/:id', auth, allowRoles('admin'), updateRecord);
router.delete('/:id', auth, allowRoles('admin'), deleteRecord);

module.exports = router;