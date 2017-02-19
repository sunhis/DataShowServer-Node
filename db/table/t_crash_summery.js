/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_crash_summery', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
      day_time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      plat: {
        type: DataTypes.STRING,
            allowNull: false
      },
      app: {
        type: DataTypes.STRING,
            allowNull: false
      },
      version: {
        type: DataTypes.STRING,
            allowNull: false
      },
      machine: {
        type: DataTypes.STRING,
        allowNull: false
     },
      os:{
         type: DataTypes.STRING,
          allowNull: false
      },
    crash_times: {
        type:  DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: ''
    },
    crash_users: {
      type:  DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 't_crash_summery',
    timestamps: false
  });
};
