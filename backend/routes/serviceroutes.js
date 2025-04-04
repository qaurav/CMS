const express = require("express");
const router  = express.Router();
const {createService, getService, updateService, deleteService } = require("../controllers/serviceControllers");
const auth = require('../middleware/auth');

router.post("/", auth, createService);
router.get("/", getService);
router.patch("/:id", auth, updateService);
router.delete("/:id", auth, deleteService)

module.exports = router;