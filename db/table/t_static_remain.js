/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_static_remain', {
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
      remain_1: {
        type:  DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: ''
      },
    remain_1_rate: {
      type:  DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
      remain_2: {
        type:  DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: ''
      },
    remain_2_rate: {
      type:  DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
      remain_3: {
        type:  DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: ''
        },
    remain_3_rate: {
      type:  DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
      remain_4: {
        type:  DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: ''
        },
    remain_4_rate: {
      type:  DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
      remain_5: {
        type:  DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: ''
        },
    remain_5_rate: {
      type:  DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
      remain_6: {
        type:  DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: ''
    },
    remain_6_rate: {
      type:  DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 't_static_remain_day',
    timestamps: false
  });
};
