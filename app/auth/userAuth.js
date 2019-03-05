const bcrypt = require('bcrypt');
const daoCommon = require('../dao/common/daoCommon');
const jwt = require("jsonwebtoken");

class userAuth {
    constructor() {
        this.common = new daoCommon();
    }
    userAuth(req, res) {
        // Creating sql request for the api system
        let sqlRequest = "SELECT * FROM user WHERE uName = '" + req.body.uName + "'";
        this.common.userExists(sqlRequest).then(rows => {
            // Checks if the query returns any data
            if(rows.length <= 0) {
                // If the user isnt found returns an error
                return res.status(200).json({
                    message: "Auth Failed"
                });
            }
            // If the user is in the database checks if the passwords match
            bcrypt.compare(req.body.pwd, rows[0].pwd, (err, result) => {
                if (rows[0].securityLevel)
                if (err) {
                    return res.status(201).json({
                        message: err
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: rows[0].email,
                        id: rows[0].id,
                        securityLevel: rows[0].securityLevel
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                return res.status(200).json({
                    message: "Auth Failed"
                });
            });
        })
    }
}

module.exports = userAuth;