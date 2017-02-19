/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_static_active', {
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
    channel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active_1: {
      type:  DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    },
    active_2: {
      type:  DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    },
    active_3: {
      type:  DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    },
    active_4: {
      type:  DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    },
    active_5: {
      type:  DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    },
    active_6: {
      type:  DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 't_static_cte_active_day',
    timestamps: false
  });
};
