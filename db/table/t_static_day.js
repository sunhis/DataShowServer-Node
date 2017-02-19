/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_static_day', {
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
    new_user: {
      type:  DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    },
    active_user: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    },
    update_user: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    },
    total_user: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 't_static_day',
    timestamps: false
  });
};
