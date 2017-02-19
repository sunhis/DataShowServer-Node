/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('t_stat_tmp_log_name', {
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
        last_user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 't_stat_tmp_log_name',
        timestamps: false
    });
};
