
module.exports = function (sequelize, DataTypes) {
    var Note = sequelize.define("Note", {
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Note.associate = function (models) {
        Note.belongsTo(models.Wine)
    };

    return Note;
};