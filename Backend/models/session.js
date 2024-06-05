const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session = sequelize.define('Session', {
    id_session: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    id_progress: {
      type: DataTypes.INTEGER,
      references: {
        model: 'progress',
        key: 'id_progress'
      }
    },
    duration_time: DataTypes.TIME,
    start_date_time: DataTypes.DATE,
    finish_date_time: DataTypes.DATE,
    status_s: DataTypes.BOOLEAN
  }, {
    tableName: 'sessions',
    timestamps: false
  });
  
  
  module.exports = Session;