const express = require("express");
const router = express.Router();
const getAdmin = require("../middleware/getAdmin");

const { createCategory, updateCategory, deleteCategory, getAllCategories, deleteSubCategory } = require("../controllers/categoryController");

router.route("/").get(getAllCategories).post(getAdmin, createCategory);
router.route("/:id").put(getAdmin, updateCategory).delete(getAdmin, deleteCategory);
router.route("/sub-category/:id").delete(getAdmin, deleteSubCategory);

module.exports = router;