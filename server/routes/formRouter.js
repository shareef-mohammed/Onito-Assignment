const express = require('express');
const { postFormData, getFormData } = require('../controllers/formController');
const router = express();

router.post('/formData', postFormData);
router.get('/formData', getFormData);

module.exports = router;