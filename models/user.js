module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models){
      User.hasMany(models.Wine, {
          onDelete: "cascade"
      })
      User.hasMany(models.Note, {
            onDelete: "cascade"
      })
      User.hasMany(models.Rating_review)
  }
  
  return User;
};
