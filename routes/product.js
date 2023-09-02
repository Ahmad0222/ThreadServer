const express = require('express');
const router = express.Router();
const getAdmin = require("../middleware/getAdmin");

const { getProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/productController");

router.route("/").get(getProducts).post(getAdmin, addProduct);
router.route("/:id").post(getAdmin, updateProduct).delete(getAdmin, deleteProduct);


module.exports = router;