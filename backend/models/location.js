const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    locationname :{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    service:[{type: mongoose.Schema.Types.ObjectId, ref: 'Service'}]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Location', locationSchema);