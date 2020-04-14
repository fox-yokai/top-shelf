
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

    Note.associate = function (models) {
        Note.belongsTo(models.Wine, {
            foriegnKey: {
                allowNull: false
            }
        })
    };

    return Note;
};