const couponModel =require("../model/coupon");


exports.couponCreate = async (req, res) => {
    const couponcreate = req.body;
    await couponModel.create(couponcreate)
      .then((value) => {
        console.log("Coupon create succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };