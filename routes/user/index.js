const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { User, sequelize, Sequelize } = require('../../models')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

router.get('/create', async (req, res, next) => {
  try {
    const result = await User.create({
      userid: 'dlstn4509ㅇ',
      userpw: await bcrypt.hash('1111', Number(process.env.BCRYPT_ROUND)),
      username: '최인수',
      email: 'dlstn7609@hanmail.net',
    })
    res.json(result)
  }
  catch (err) {
    next(createError(err))
  }
})

router.get('/update/:id', async (req, res, next) => {
  // User.update({고칠내용}, {where})
  try {
    const { id } = req.params
    const result = await User.update({
      username: '인수~~~~',
    }, {
      where: { id }
    })
    res.json(result)
  }
  catch (err) {
    next(createError(err))
  }
})

router.get('/delete/:id', async (req, res, next) => {
  // User.destroy({where})
  try {
    const { id } = req.params
    const result = await User.destroy({
      where: { id }
    })
    res.json(result)
  }
  catch (err) {
    next(createError(err))
  }
})

router.get('/read/', async (req, res, next) => {
  try {
    const { id } = req.params
    /* 필드 옵션 */
    // const result = await User.findAll()

    // const result = await User.findAll({ attributes: ['id', 'username'] })

    /* const result = await User.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'id_count'],
      ]
    }) */

    /* const result = await User.findAll({
      attributes: { exclude: ['userpw'] }
    }) */

    /* WHERE 옵션 */
    const { Op } = Sequelize
    /* const result = await User.findAll({
      where: {
        id: 1
      }
    }) */

    /* const result = await User.findAll({
      [Op.and]: {
        where: {
          [Op.and]: [{ id: 1 }, { id: 3 }],  
        }
      }
    }) */

    const result = await User.findAll({
        where: {
          username: {
            // [Op.like]: '%수'
            // [Op.substring]: '최'
            [Op.regexp]: '^[수|~]'
          }
        }
    })





    res.json(result)
  }
  catch (err) {
    next(createError(err))
  }
})

router.get('/read/:id', async (req, res, next) => {

})

module.exports = router
