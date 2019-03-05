//load student data access object
const LuxDao = require('../dao/luxDao');
const ControllerCommon = require('./common/controllerCommon');
const luxRental = require('../model/luxRental');
const userAuth = require('../auth/userAuth')

class LuxController {
    constructor() {
        this.luxDao = new LuxDao();
        this.common = new ControllerCommon();
        this.auth = new userAuth();
    }
    /*
    BLOCK 1
    All of these will be using the Controller Common file located in /common/controllerCommon
    this is what is returning the response to the user.

    If there is an error it will run the Common findError Function.

    They will also be using the luxDao Class located at ../dao/luxDao
    
    */

    // Finds all the products in the database

    findAll(res) {
        this.luxDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
    // Finds product by the id

    findOne(req, res) {
        let id = req.params.id;
        this.luxDao.findOne(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
    // Finds product by the name

    findByName(req, res) {
        let cars = req.params.cars;
        this.luxDao.findByName(cars)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
    // Creates a new product, Note Setup validation system so only admin can use this route

    create(req, res) {
        let cars = new luxRental.Products();
        if(req.body.id) {
            cars.id = req.body.id;
        }

        cars.make = req.body.make;
        cars.model = req.body.model;
        cars.mpg = req.body.mpg;
        cars.image = req.body.image;
        cars.description = req.body.description;

        return this.luxDao.addProduct(cars)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    }
    // This rout hase been depricated

    findAllUsers(res) {
        this.luxDao.findAllUsers()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
    // Validates if the user is in the database

    checkUser(req, res) {
        let user = req.body.uName;
        let pwd = req.body.pwd;
        this.luxDao.checkUser(user, pwd)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));

    }
    // Registers the user

    userRegister(req, res) {
        this.luxDao.registerUser(req)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
    /*
        End block 1
    */

    /*
        Block 2
        This block handles user validation. It does not use Common or luxDao like previsouly in block 1
        This uses userAuth class and the file is located in ../auth/userAuth

        The response instead of being handled in a then statement is handled within the function itself.
    */
    // Logs the user in

    userLogin(req, res) {
        this.auth.userAuth(req, res)
    }
    /*
        End Block 2
    */
}

module.exports = LuxController;