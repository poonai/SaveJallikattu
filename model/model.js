const mongoose = require('mongoose')
const detail = new mongoose.Schema({
  area: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const model = mongoose.model('protestarea', detail)

exports.addDetail = (data) => {
  return new Promise((resolve, reject) => {
    let detail = new model(data)
    detail.save((err, res) => {
      if (err) {
        reject(true)
      } else {
        resolve(true)
      }
    })
  })
}

exports.getDetail = (query) => {
  return new Promise((resolve, reject) => {
    model.find(query)
    .limit(20)
    .sort('created_at')
    .exec((err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
