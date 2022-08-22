const express = require("express");
const router = express.Router();
const Controllers = require("../controller/productcontroller");

router.post("/addproduct", Controllers.addProduct);
router.get("/viewproduct", Controllers.viewProduct);
router.get("/viewsingleproduct/:id", Controllers.viewSingleProduct);
router.delete("/deleteproduct/:id", Controllers.deleteProduct);
router.put("/updateproduct/:id", Controllers.updateProduct);
router.put("/checkoutproduct/:id", Controllers.checkoutProduct);
router.post("/addtowishlist/:id", Controllers.authorize, Controllers.addToWishlist)
router.get("/deletefromwishlist",Controllers.authorize,Controllers.deleteFromWishlist)
router.get("/showwishlist",Controllers.authorize, Controllers.showWishlist)

module.exports = router;
