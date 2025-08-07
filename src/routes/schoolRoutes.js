const express = require("express");
const connectDB = require("../models/db");
const SchoolModel = require("../models/schoolModel");
const SchoolController = require("../controllers/schoolController");

const router = express.Router();
const db = connectDB();
const schoolModel = new SchoolModel(db);
const schoolController = new SchoolController(schoolModel);

router.post("/addSchool", schoolController.addSchool.bind(schoolController));
router.get("/listSchools", schoolController.listSchools.bind(schoolController));

module.exports = router;
