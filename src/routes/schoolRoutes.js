const express = require('express');
const SchoolController = require('../controllers/schoolController');

const router = express.Router();
const schoolController = new SchoolController();

router.post('/addSchool', schoolController.addSchool.bind(schoolController));
router.get('/listSchools', schoolController.listSchools.bind(schoolController));

module.exports = router;