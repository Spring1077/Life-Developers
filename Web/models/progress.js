const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Level = require('./level'); // Importar el modelo Level
const Session = require('./session'); // Asegúrate de importar el modelo Session


const Progress = sequelize.define('Progress', {
  id_progress: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_item: DataTypes.INTEGER,
  id_merchant: DataTypes.INTEGER,
  id_level: {
    type: DataTypes.INTEGER,
    references: {
      model: 'levels',
      key: 'id_level'
    }
  },
  finish_date: DataTypes.DATE,
  percentage: DataTypes.DOUBLE
}, {
  tableName: 'progress',
  timestamps: false
});

// Definir la relación
Progress.belongsTo(Level, { foreignKey: 'id_level' });
Session.belongsTo(Progress, { foreignKey: 'id_progress' });

module.exports = Progress;
