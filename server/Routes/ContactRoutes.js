const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authorizeRole = require("../middleware/authMiddleware");

router.post("/contact", contactController.createContact);

router.get("/contact", authorizeRole, contactController.getAllContact);

module.exports = router;
