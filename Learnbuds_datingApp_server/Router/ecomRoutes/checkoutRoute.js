const express = require("express");
const router = express.Router();
const authentication = require("../../Middlewares/jwtAuth");

const { addUserAddress, getUserAddress,editAddress } = require("../../controller/EcomController/checkoutController");

router.get("/api/user-address", authentication, getUserAddress);
router.post("/api/add-shipping-address", authentication, addUserAddress);
router.patch("/api/update-shipping-address", authentication, editAddress);


module.exports = router;
