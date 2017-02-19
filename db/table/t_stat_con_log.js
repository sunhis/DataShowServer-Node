/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('t_stat_con_log', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        app: {
            type: DataTypes.STRING,
            allowNull: false
        },
        server: {
            type: DataTypes.STRING,
            allowNull: false
        },
        log_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        log_type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        last_user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        con_type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tran_type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        speed_type: {
            type:  DataTypes.INTEGER,
            allowNull: true,
            defaultValue: ''
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 't_stat_con_log',
        timestamps: false
    });
};
