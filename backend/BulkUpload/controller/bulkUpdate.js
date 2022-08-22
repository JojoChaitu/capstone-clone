const productModel = require("../model/products");




exports.bulkUpdate = async (req, res) => {
  const myproducts = req.body;
  await productModel.insertMany(myproducts)
    .then((value) => {
      console.log("Saved data Successfully in database");
    })
    .catch((error) => {
      console.log(error);
    });
};


