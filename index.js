const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const model = require('./model/model.js')
mongoose.connect(process.env.MLAB)
app.set('view engine', 'ejs')
app.get('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
  let query = {}
  if (req.query.q != undefined) {
    query.area = new RegExp(req.query.q, 'i')
  }
  model.getDetail(query)
  .then((x) => {
    res.render('index', {
      data: x
    })
  })
  .catch((x) => {
    res.send('something went wrong')
  })
})
app.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
  let data = {
    address: req.body.address,
    area: req.body.area,
    contact: req.body.contact,
    time: req.body.time,
    date: req.body.date
  }
  model.addDetail(data)
  .then((x) => {
    res.redirect('/')
  })
  .catch((x) => {
    res.redirect('/')
  })
})
app.listen(80)
