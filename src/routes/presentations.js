import * as PresentationController from "../modules/presentation/presentationController.js";
const { isUserAuthenticated } = require("../modules/auth/auth.mdw");
var express = require("express");
const router = express.Router();

// @route GET /
// @desc Get All Presentation
// @access Private and role ADMINISTRATOR or MANAGER
router.get("/", isUserAuthenticated, PresentationController.getAllByUserId);

// @route GET /
// @desc Get All Presentation by Group ID
// @access Private and role ADMINISTRATOR or MANAGER
router.get("/by-group/:id", isUserAuthenticated, PresentationController.getAllByUserId);

// @route GET /:id
// @desc Show Presentation
// @access Private and role ADMINISTRATOR or MANAGER
router.get("/:id", isUserAuthenticated, PresentationController.getOneById);

// @route GET /code/:code
// @desc Show Presentation
// @access Private and role ADMINISTRATOR or MANAGER
router.get("/by-code/:code", isUserAuthenticated, PresentationController.getOneByCode);

// @route POST /
// @desc Create Presentation
// @access Private and role ADMINISTRATOR
router.post("/", isUserAuthenticated, PresentationController.postCreate);

// @route PUT /:id
// @desc Update Presentation
// @access Private and role ADMINISTRATOR
router.put("/:id", isUserAuthenticated, PresentationController.putUpdate);

// @route PUT /enable/:id
// @desc Update Presentation
// @access Private and role ADMINISTRATOR
router.put("/enable/:id", isUserAuthenticated, PresentationController.putEnablePresent);

// @route PUT /disable/:id
// @desc Update Presentation
// @access Private and role ADMINISTRATOR
router.put("/disable/:id", isUserAuthenticated, PresentationController.putDisablePresent);

// @route DELETE /:id
// @desc Delete Presentation
// @access Private and role ADMINISTRATOR
router.delete("/:id", isUserAuthenticated, PresentationController.deleteRemove);

module.exports = router;
