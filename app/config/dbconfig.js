let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/cars.db');

let init = function () {

    db.run("CREATE TABLE if not exists cars (" +
        " id INTEGER PRIMARY KEY," +
        " make TEXT," +
        " model TEXT," +
        " mpg TEXT," +
        " image TEXT," +
        " description TEXT" +
        ")");
    db.run("CREATE TABLE if not exists user (" +
        " id INTEGER PRIMARY KEY," +
        " uName TEXT," +
        " email TEXT," +
        " fName TEXT," +
        " lName TEXT," +
        " pwd TEXT," +
        " location TEXT," +
        " securityLevel INT," +
        " gender_id INT," +
        " FOREIGN KEY('gender_id') REFERENCES 'gender'('id')" +
        ")");
    db.run("CREATE TABLE if not exists gender (" +
        " id INTEGER PRIMARY KEY," +
        " gender Text" +
        ")");
};

module.exports = {
    init: init,
    db: db,
};