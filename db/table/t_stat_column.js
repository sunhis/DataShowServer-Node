/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('t_stat_column', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        bid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        column_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        column_desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stat_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        column_order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type:  DataTypes.INTEGER,
            allowNull: true,
            defaultValue: ''
        },
        last_user: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 't_stat_column',
        timestamps: false
    });
};
