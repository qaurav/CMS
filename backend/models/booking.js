const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type: Number,
        required:true
    },
    service:{type:mongoose.Schema.Types.ObjectId, ref:"Service", required:true},
    address:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    message:{type:String},
    status:{
        type: String,
        enum:["Pending", "Confirmed", "Completed", "Cancelled"],
        default:"Pending"
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Booking",bookingSchema);
