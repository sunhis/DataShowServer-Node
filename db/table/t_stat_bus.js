module.exports = function(sequelize, DataTypes) {
    return sequelize.define('t_stat_bus', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        bname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bus_des: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        },
        last_user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        },{
        tableName: 't_stat_bus',
        timestamps: false
        });
};