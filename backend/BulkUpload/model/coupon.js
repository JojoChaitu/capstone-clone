const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const couponSchema = new schema({
  id: {
    type: ObjectId,
    unique: true,
  },
  couponName: {
    type: String,
    required: true,
  },
  couponDiscount: {
    type: Number,
    required: true,
  },
});

const couponModel = mongoose.model("CouponData", couponSchema);

module.exports = couponModel;
