let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/cars.db');
// db.get("PRAGMA foreign_keys = ON");

let init = function () {
    /* 
        Block 1
        This is the initializer when you load the api it creates the database for the api if it doesnt exist.
        The database will be located in /db/cars.db
    */

    //Creates the products table in cars.db
    db.run("CREATE TABLE if not exists cars (" +
        " id INTEGER PRIMARY KEY," +
        " make TEXT NOT NULL," +
        " model TEXT NOT NULL," +
        " mpg TEXT NOT NULL," +
        " image TEXT NOT NULL," +
        " description TEXT NOT NULL" +
        ")"
    );
    //Creates the user table in the cars.db
    db.run("CREATE TABLE if not exists user (" +
        " id INTEGER PRIMARY KEY," +
        " uName TEXT NOT NULL," +
        " email TEXT NOT NULL," +
        " fName TEXT NOT NULL," +
        " lName TEXT NOT NULL," +
        " pwd TEXT NOT NULL," +
        " location TEXT NOT NULL," +
        " security_id INT NOT NULL," +
        " gender_id INT NOT NULL," +
        " FOREIGN KEY('gender_id') REFERENCES 'gender'('id')" +
        " FOREIGN KEY('security_id') REFERENCES 'securityLevel'('id')" +
        ")"
    );
    db.run("CREATE TABLE if not exists gender (" +
        " id INTEGER PRIMARY KEY," +
        " gender Text" +
        ")"
    );
    db.run("CREATE TABLE IF NOT EXISTS securityLevel (" +
        " id INTEGER PRIMARY KEY, " + 
        " securityLevel TEXT " +
        ")"
    );
    db.run("CREATE TABLE IF NOT EXISTS orders (" + 
        " id INTERGER PRIMARY KEY, " + 
        " product_id INT NOT NULL, " +
        " user_id INT NOT NULL, " + 
        " date TEXT NOT NULL, " + 
        " price INT NOT NULL, " +
        " FOREIGN KEY('user_id') REFERENCES 'user'('id')" + 
        " FOREIGN KEY('product_id') REFERENCES 'cars'('id')" +
        " )")
};

    /* 
        End block 1
    */

    //This just exports the init and db functions

module.exports = {
    init: init,
    db: db,
};