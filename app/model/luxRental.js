class Products {
    constructor(id, make, model, mpg, image, description) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.mpg = mpg;
        this.image = image;
        this.description = description;
    }
}

class User {
    constructor(id, uName, email, fName, lName, pwd, location, securityLevel, gender_id) {
        this.id = id;
        this.uName = uName;
        this.email = email;
        this.fName = fName;
        this.lName = lName;
        this.pwd = pwd;
        this.location = location;
        this.securityLevel = securityLevel;
        this.gender_id = gender_id;
    }
}

module.exports = {
    Products: Products,
    User: User
};