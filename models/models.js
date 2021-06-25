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

//define tables in db
const User = sequelize.define('user', {
  id: ID,
  fullName: {type: DataTypes.STRING, allowNull: false},
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {type: DataTypes.STRING, allowNull: false}
})

const Role = sequelize.define('role', {
  id: ID,
  role: {type: DataTypes.STRING}
})

const Position = sequelize.define('position', {
  id: ID,
  position: {type: DataTypes.STRING}
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
  description: {type: DataTypes.STRING}
})

const EventType = sequelize.define('event_type', {
  id: ID,
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
})

const Manual = sequelize.define('manual', {
  id: ID,
  title: TITLE,
  description: {type: DataTypes.STRING}
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

const UserRoles = sequelize.define('user_roles', {
  id: ID
})

const UserPositions = sequelize.define('users_positions', {
  id: ID
})

const QuestionsAnswers = sequelize.define(
  'question_answers',
  {
    id: ID
  }
)

//make relations between tables

User.belongsToMany(Role, {through: UserRoles})
Role.belongsToMany(User, {through: UserRoles})

User.belongsToMany(Position, {through: UserPositions})
Position.belongsToMany(User, {through: UserPositions})

User.hasMany(Question)
Question.belongsTo(User)

User.hasMany(Answer)
Answer.belongsTo(User)

Question.belongsToMany(Answer, {through: QuestionsAnswers})
Answer.belongsToMany(Question, {through: QuestionsAnswers})

User.hasMany(Event)
Event.belongsTo(User)

EventType.hasOne(Event)
Event.belongsTo(EventType)

Event.hasMany(Comment)
Comment.belongsTo(Event)

Event.hasMany(File)
File.belongsTo(Event)

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Manual)
Manual.belongsTo(User)

User.hasMany(File)
File.belongsTo(User)

Manual.hasMany(File)
File.belongsTo(Manual)

module.exports = {
  User,
  Role,
  Position,
  Question,
  Answer,
  Event,
  EventType,
  Manual,
  Comment,
  File,
  UserRoles,
  UserPositions,
  QuestionsAnswers
}
