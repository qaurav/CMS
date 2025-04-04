const Location = require("../models/location");
const { validateLocation } = require("../utils/validation");

exports.createLocation = async (req, res) => {
  try {
    const { isValid, errors } = validateLocation(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    } else {
      const locationname = req.body.locationname;
      const existedlocation = await Location.findOne({ locationname });
      if (existedlocation) {
        return res
          .status(400)
          .json({ success: false, message: "Location Name already exist." });
      } else {
        const newlocation = new Location(req.body);
        await newlocation.save();
        return res.status(201).json({
          success: true,
          data: newlocation,
          message: " New Location added ",
        });
      }
    }
  } catch (err) {
    // console.log("Error while creating Location", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const locations = await Location.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      data: locations,
      message: "Locations retrived from DB",
    });
  } catch (err) {
    // console.log("Error Fetching locations", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { isValid, errors } = validateLocation(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    } else {
      const existedlocation = await Location.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!existedlocation) {
        return res.status(404).json({
          success: false,
          message: "Location not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: existedlocation,
          message: "Locations updated",
        });
      }
    }
  } catch (err) {
    // console.log("Error Updating locations", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Locations deleted",
      });
    }
  } catch (err) {
    // console.log("Error Deleting locations", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};
