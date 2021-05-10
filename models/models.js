const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const ID = {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
}

const TITLE = {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false
}

const DESCRIPTION = {
  type: DataTypes.STRING
}

const RATING = {type: DataTypes.FLOAT}

const User = sequelize.define('user', {
  id: ID,
  firstName: {type: DataTypes.STRING, allowNull: false},
  secondName: {type: DataTypes.STRING, allowNull: false},
  thirdName: {type: DataTypes.STRING, allowNull: true},
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {type: DataTypes.STRING}
})

const Role = sequelize.define('role', {
  id: ID,
  role: {type: DataTypes.STRING}
})

const Position = sequelize.define('position', {
  id: ID
})

const News = sequelize.define('news', {
  id: ID,
  title: TITLE,
  description: DESCRIPTION,
  rating: RATING
})

const Question = sequelize.define('question', {
  id: ID,
  question: {type: DataTypes.STRING, unique: true}
})
const Answer = sequelize.define('answer', {
  id: ID,
  answer: {type: DataTypes.STRING}
})

const Event = sequelize.define('event', {
  id: ID,
  title: TITLE,
  description: DESCRIPTION,
  rating: RATING
})

const EventType = sequelize.define('event_type', {
  id: ID,
  title: TITLE,
  description: DESCRIPTION,
  rating: RATING,
  link: {type: DataTypes.STRING}
})

const Manual = sequelize.define('manual', {
  id: ID,
  title: TITLE,
  description: DESCRIPTION
})

const Comment = sequelize.define('comment', {
  id: ID,
  comment: {type: DataTypes.STRING}
})

const File = sequelize.define('file', {
  id: ID,
  name: {type: DataTypes.STRING},
  pathToFile: {type: DataTypes.STRING}
})

User.hasMany(Role)
Role.belongsTo(User)

User.hasOne(Position)
Position.belongsTo(User)

User.hasMany(News)
News.belongsTo(User)

User.hasMany(Question)
Question.belongsTo(User)

User.hasMany(Answer)
Question.belongsTo(User)

Question.hasOne(Answer)
Answer.belongsTo(Question)

User.hasMany(Manual)
Manual.belongsTo(User)

User.hasMany(Event)
Event.belongsTo(User)

Event.hasOne(EventType)
EventType.belongsTo(Event)

Event.hasMany(Comment)
Comment.belongsTo(Event)

module.exports = {
  User,
  Role,
  Position,
  News,
  Question,
  Answer,
  Event,
  EventType,
  Manual,
  Comment,
  File
}
