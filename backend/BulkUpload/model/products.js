
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requied: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image:{
    type:String
  }
});




const productModel = mongoose.model("productdatas", productSchema)



module.exports = productModel;


