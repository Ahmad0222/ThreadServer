const express = require("express");
const router = express.Router();
const getAdmin = require("../middleware/getAdmin");

const { createModel, updateModel, deleteModel, getAllModels } = require("../controllers/modelController");

router.route("/").get(getAllModels).post(getAdmin, createModel);
router.route("/:id").put(getAdmin, updateModel).delete(getAdmin, deleteModel);

module.exports = router;