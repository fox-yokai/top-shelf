
module.exports = function (sequelize, DataTypes) {
    var Note = sequelize.define("Note", {
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        wine_id: {
            type: DataTypes.INTEGER,
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