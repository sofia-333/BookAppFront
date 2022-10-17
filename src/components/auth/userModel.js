let userModel = class {
    constructor(username = null, password = null, password2 = null, first_name = null, last_name = null) {
        this.username = username;
        this.password = password;
        this.password2 = password2;
        this.first_name = first_name;
        this.last_name = last_name;
    }
};

export default userModel;