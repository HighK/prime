"use strict";
module.exports = (sequelize, DataTypes) => {
  var projects = sequelize.define("projects", {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT("long")
    },
    category1: {
      type: DataTypes.STRING
    },
    category2: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.STRING
    },
    supports: {
      type: DataTypes.INTEGER,
      defultValue: 0,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tags: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return projects;
};
