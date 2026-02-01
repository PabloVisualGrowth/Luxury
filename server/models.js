const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false
});

const User = sequelize.define('User', {
    id: { type: DataTypes.STRING, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING }
});

const Course = sequelize.define('Course', {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    thumbnail: { type: DataTypes.STRING },
    modules: { type: DataTypes.JSON } // Storing modules as JSON for simplicity
});

const Resource = sequelize.define('Resource', {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    fileUrl: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING }
});

const Progress = sequelize.define('Progress', {
    userId: { type: DataTypes.STRING, allowNull: false },
    courseId: { type: DataTypes.STRING, allowNull: false },
    completedLessons: { type: DataTypes.JSON, defaultValue: [] },
    lastAccessed: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = { sequelize, User, Course, Resource, Progress };
