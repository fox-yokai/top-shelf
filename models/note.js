
module.exports = function (sequelize, DataTypes) {
    var Note = sequelize.define("Note", {
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wine_id: {
            type: DataTypes.STRING,
        }
    });
    return Note;
};