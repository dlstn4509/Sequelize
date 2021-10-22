module.exports = (sequelize, DataType) => {
  // define('객체명', 객체속성, 객체옵션)
  const Users = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userid: {
      type: DataType.STRING(24),
      allowNull: false,
      unique: true,
    },
    userpw: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataType.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
  });
  return Users;
};