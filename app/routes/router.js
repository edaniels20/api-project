const express = require("express");
const router = express.Router();

router.use("/luxwheels", require("./api/luxRoutes"));

//add more api routes here



module.exports = router;