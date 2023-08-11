const { Router } = require("express");
const UserController = require("../../controllers/Users/index.cjs");
const router = Router();
router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteSingle);

module.exports = router;
