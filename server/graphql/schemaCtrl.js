const bcrypt = require("bcrypt");
class User {
  constructor({
    user_id,
    user_name,
    user_email,
    first_name,
    last_name,
    phone_number
  }) {
    this.id = user_id;
    this.name = user_name;
    this.email = user_email;
    this.firstName = first_name;
    this.lastName = last_name;
    this.phoneNumber = phone_number;
  }
}
function getUsers(_, req) {
  return req.app
    .get("db")
    .get_users()
    .then(response => {
      return response.map(val => {
        return new User(val);
      });
    });
}
function getUser({ id }, req) {
  return req.app
    .get("db")
    .get_users()
    .then(response => {
      const filtered = response.filter(user => {
        return user.user_id === id;
      });
      return new User(filtered[0]);
    });
}
function deleteUser({ id }, req) {
  return req.app
    .get("db")
    .delete_user(id)
    .then(response => {
      return new User(response[0]);
    });
}
function addUser(
  { userName, email, firstName, lastName, phoneNumber, password },
  req
) {
  return req.app
    .get("db")
    .add_user([
      userName,
      email,
      firstName,
      lastName,
      phoneNumber,
      bcrypt.hashSync(password, 10)
    ])
    .then(response => {
      return new User(response[0]);
    });
}
function verifyUser({ email, password, userName }, req) {
  return req.app
    .get("db")
    .get_users()
    .then(response => {
      const filtered = response.filter(e => {
        return e.user_email === email || e.user_name === userName;
      });
      if (!filtered[0]) {
        throw new Error("incorrect email or username");
      } else {
        return filtered[0];
      }
    })
    .then(credentials => {
      if (bcrypt.compareSync(password, credentials.user_password)) {
        return new User(credentials);
      } else {
        throw new Error("password incorrect");
      }
    });
}

module.exports = {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  verifyUser
};
