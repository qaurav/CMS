const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
