module.exports = (sequelize, force = false) => {
  sequelize
    .sync({ force }) // 실제DB랑 연동시키는것
    .then(() => {'Sequelize Start!'})
    .catch((err) => console.log('Sequelize Error =>', err))
}

// force: true 하면 기존 테이블 삭제 후 재생성, 기본값은 false