"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    },
    accounts: {
      type: DataTypes.STRING
    }
  });

  return user;
};
