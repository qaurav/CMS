const express = require("express");
const router  = express.Router();
const {createLocation, getLocation, updateLocation, deleteLocation } = require("../controllers/locationControllers");
const auth = require('../middleware/auth');

router.post("/", auth, createLocation);
router.get("/", getLocation);
router.patch("/:id", auth, updateLocation);
router.delete("/:id", auth, deleteLocation)

module.exports = router;