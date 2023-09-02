const express = require("express");
const router = express.Router();
const getAdmin = require("../middleware/getAdmin");

const { createBrand, updateBrand, deleteBrand, getAllBrands } = require("../controllers/brandController");

router.route("/").get(getAllBrands).post(getAdmin, createBrand);
router.route("/:id").put(getAdmin, updateBrand).delete(getAdmin, deleteBrand);

module.exports = router;