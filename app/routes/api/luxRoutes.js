//express router config
const express = require('express');
const router = express.Router();

//controller here
const LuxController = require('../../controller/luxController');
const luxController = new LuxController();

//Products rout
router.get('/products', function(req, res) {
    luxController.findAll(res);
});

// Product by id rout
router.get('/products/:id', function(req, res) {
    luxController.findOne(req, res);
});

// Product by name rout
router.get("/products/name/:make", function(req, res) {
    luxController.findByName(req, res);
});

// Create a product rout
router.post('/products/create', function (req, res) {
    luxController.create(req, res);
})

// User register rout
router.post('/user/register', function (req, res) {
    luxController.userRegister(req, res);
})

// User login rout
router.post('/user/login', function (req, res) {
    luxController.userLogin(req, res);
})

module.exports = router;