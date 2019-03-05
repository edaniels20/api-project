const luxRental = require('../model/luxRental');
const daoCommon = require('./common/daoCommon');
const bcrypt = require("bcrypt");
// Referance class
class luxDao {
    constructor() {
        this.common = new daoCommon();
    }
    //Returns all products in json format
    findAll() {
        let sqlRequest = "SELECT * FROM cars";
        return this.common.findAll(sqlRequest).then(rows => {
            let cars = [];
            for (const row of rows) {
                cars.push(new luxRental.Products(
                        row.id,
                        row.make,
                        row.model,
                        row.mpg,
                        row.image,
                        row.description
                    )
                );
            }
            return cars;
        });
    }
    // Used in product rout ceates sql statement and searches by the id with the router /products/id
    findOne(id) {
        let sqlRequest = "SELECT * FROM cars WHERE id =" + id;
        return this.common.findAll(sqlRequest).then(rows => {
            let cars = [];
            for (const row of rows) {
                cars.push(new luxRental.Products(
                        row.id,
                        row.make,
                        row.model,
                        row.mpg,
                        row.image,
                        row.description
                    )
                );
            }
            return cars;
        });
    }
    // Used in name rout creates sql query and looks for cars by make with the rout /products/name/make
    findByMake(make) {
        let sqlRequest = "SELECT * FROM cars WHERE make = '" + make + "'";
        return this.common.findAll(sqlRequest).then(rows => {
            let cars = [];
            for (const row of rows) {
                cars.push(new luxRental.Products(
                        row.id,
                        row.make,
                        row.model,
                        row.mpg,
                        row.image,
                        row.description
                    )
                );
            }
            return cars;
        });
    }
    // Accepts json data and submits it into the database on the /products/create route
    addProduct(Products) {
        let sqlRequest = "INSERT INTO cars (make, model, mpg, image, description) " +
        "VALUES ($make, $model, $mpg, $image, $description)";

        let sqlParams = {
            $make: Products.make,
            $model: Products.model,
            $mpg: Products.mpg,
            $image: Products.image,
            $description: Products.description
        };
        return this.common.run(sqlRequest, sqlParams);
    };
    
    findAllUsers() {
        let sqlRequest = 'SELECT * FROM user';
        return this.common.findAll(sqlRequest).then(rows => {
            let users = [];
            for (const row of rows) {
                users.push(new luxRental.User(
                        row.id,
                        row.uName,
                        row.email,
                        row.fName,
                        row.lName,
                        row.pwd,
                        row.location,
                        row.securityLevel,
                        row.gender
                    )
                );
            }
            return users;
        });
    }
    // This is used to log user in it checks uName and pwd in the user database.
    // checkUser(uName, pwd) {
    //     let sqlRequest = "SELECT * FROM user WHERE uName = '" + uName + "'";
    //     return this.common.findAll(sqlRequest).then(rows => {
    //         let users;
    //         for (const row of rows) {
    //             users = (new luxRental.User(
    //                     row.id,
    //                     row.uName,
    //                     row.email,
    //                     row.fName,
    //                     row.lName,
    //                     row.pwd,
    //                     row.location,
    //                     row.securityLevel,
    //                     row.gender
    //                 )
    //             );
    //         }
    //         if (users['pwd'] === pwd) {
    //             return users
    //         } else {
    //             return "invalid username or password"
    //         }
    //     });
    // }
    // Register route url is user/register
    registerUser(req) {
        // Creating the sql request to check if user name or email is taken
        let sqlRequest = "SELECT * FROM user WHERE uName = '" + req.body.uName + "' OR email = '" + req.body.email + "'";
        // Submiting the sql query it is return as wors
        return this.common.userExists(sqlRequest).then(rows => {
            // Checking if the query returned any data
            if (rows.length > 0) {
                // Using Auth failed to prevent from brute force attacks
                return "Auth Failed";
            } else {
                // Hashing password using bcrypt assigning to value hash
                bcrypt.hash(req.body.pwd, 10, (err, hash) => {
                    if (err) {
                        return err
                    } else {
                        // Creating prepared statment with the values from the request and hashed password
                        let sqlRequest = "INSERT INTO user (uName, email, fName, lName, pwd, location, securityLevel, gender_id)" + 
                        "VALUES ($uName, $email, $fName, $lName, $pwd, $location, $securityLevel, $gender)";
                        let sqlParams = {
                            $uName: req.body.uName,
                            $email: req.body.email,
                            $fName: req.body.fName,
                            $lName: req.body.lName,
                            $pwd: hash,
                            $location: req.body.location,
                            $securityLevel: 1,
                            $gender: req.body.gender_id
                        }
                        return this.common.run(sqlRequest, sqlParams);
                    }
                })
            }
        });
    }
    
}

module.exports = luxDao;