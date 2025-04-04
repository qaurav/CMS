const express = require("express");
const router  = express.Router();
const {createBooking, getBooking, updateBooking, deleteBooking } = require("../controllers/bookingControllers");
const auth = require('../middleware/auth');

router.post("/", createBooking);
router.get("/", auth, getBooking);
router.patch("/:id", auth, updateBooking);
router.delete("/:id", auth, deleteBooking)

module.exports = router;