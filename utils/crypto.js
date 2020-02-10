const crypto = require("crypto");

exports.hashPassword = (inputPassword, salt) => {
  crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");
};
