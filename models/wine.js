module.exports = function (sequelize, DataTypes) {
    var Wine = sequelize.define("Wine", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        variety: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        winery: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.INTEGER
        },
        numBottles: {
            type: DataTypes.INTEGER
        }
    });

    Wine.associate = function (models) {
        Wine.belongsTo(models.User),
            Wine.hasMany(models.Note, {
                onDelete: "cascade"
            }),
            Wine.hasMany(models.Rating_review)
    }


    return Wine;
};