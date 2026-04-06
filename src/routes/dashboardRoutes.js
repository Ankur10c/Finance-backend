const router = require('express').Router();
const { getSummary } = require('../controllers/dashboardController');
const { auth, allowRoles } = require('../middlewares/authMiddleware');

router.get('/summary', auth, allowRoles('admin', 'analyst'), getSummary);

module.exports = router;