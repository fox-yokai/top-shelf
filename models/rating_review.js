module.exports = function (sequelize, DataTypes) {
    var Rating_review = sequelize.define("Rating_review", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review: {
            type: DataTypes.STRING,
        },
        wine_id: {
            type: DataTypes.INTEGER,
        }
    });

    return Rating_review;
};