module.exports = function(sequelize, DataTypes) {
    return sequelize.define('test', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
       age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        },{
        tableName: 'test',
        timestamps: false
        });
};
