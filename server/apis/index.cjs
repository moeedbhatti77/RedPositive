const router = require("express").Router();

router.use("/users", require("./Users/index.cjs"));

module.exports = router;
