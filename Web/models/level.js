const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Level = sequelize.define('Level', {
  id_level: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  role: DataTypes.STRING
}, {
  tableName: 'levels',
  timestamps: false
});

module.exports = Level;
