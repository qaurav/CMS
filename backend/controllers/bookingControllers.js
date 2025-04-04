const Booking = require("../models/booking");
const { validateBooking } = require("../utils/validation");

exports.createBooking = async (req, res) => {
  try {
    const { isValid, errors } = validateBooking(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    } else {
        const booking = await Booking.create(req.body);
      if (!booking) {
        return res
          .status(500)
          .json({ success: false, message: "Booking Failed." });
      } else {
        return res.status(201).json({
          success: true,
          data: booking,
          message: " New Booking added ",
        });
      }
    }
  } catch (err) {
    // console.log("Error while creating Booking", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      data: bookings,
      message: "Bookings retrived from DB",
    });
  } catch (err) {
    // console.log("Error Fetching bookings", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { isValid, errors } = validateBooking(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    } else {
      const existedbooking = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!existedbooking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: existedbooking,
          message: "Booking updated",
        });
      }
    }
  } catch (err) {
    // console.log("Error Updating Booking", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};


exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Booking deleted",
      });
    }
  } catch (err) {
    // console.log("Error Deleting Booking", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};