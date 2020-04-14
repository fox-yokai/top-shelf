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


    Rating_review.associate = function (models) {
        Rating_review.belongsTo(models.Wine, {
            foriegnKey: {
                allowNull: false
            }
        })
    };


    return Rating_review;
};