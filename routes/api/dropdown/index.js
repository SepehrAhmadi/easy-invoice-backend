const express = require("express");
const router = express.Router();

const dropdownController = require("../../../controllers/dropdown/dropdownController");

router.route("/packagings").get(dropdownController.getPackagings);
router.route("/units").get(dropdownController.getUnits);
router.route("/companies").get(dropdownController.getCompanies);
router.route("/brands").get(dropdownController.getBrands);
router.route("/products").get(dropdownController.getProducts);

module.exports = router;
