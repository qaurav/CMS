const Service = require("../models/service");
const { validateService } = require("../utils/validation");

exports.createService = async (req, res) => {
  try {
    const { isValid, errors } = validateService(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    } else {
      const name = req.body.name;
      const existedservice = await Service.findOne({ name });
      if (existedservice) {
        return res
          .status(400)
          .json({ success: false, message: "Service Name already exist." });
      } else {
        const newservice = new Service(req.body);
        await newservice.save();
        return res.status(201).json({
          success: true,
          data: newservice,
          message: " New Service added ",
        });
      }
    }
  } catch (err) {
    // console.log("Error while creating Service", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const services = await Service.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      data: services,
      message: "Services retrived from DB",
    });
  } catch (err) {
    // console.log("Error Fetching Services", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { isValid, errors } = validateService(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    } else {
      const existedservice = await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!existedservice) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: existedservice,
          message: "Service updated",
        });
      }
    }
  } catch (err) {
    // console.log("Error Updating Service", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Service deleted",
      });
    }
  } catch (err) {
    // console.log("Error Deleting Service", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};
