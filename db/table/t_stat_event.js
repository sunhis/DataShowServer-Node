/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('t_stat_event', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        bid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type:  DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: ''
        },
    }, {
        tableName: 't_stat_event',
        timestamps: false
    });
};
