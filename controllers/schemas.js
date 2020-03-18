const mongoose = require('mongoose')

exports.userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: [true, 'Username is required']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  }
})

exports.positionSchema = new mongoose.Schema({
  userId: {type: String, required: [true, 'UserId is required']},
  latitude: {type: Number, required: [true, 'Latitude is required']},
  longitude: {type: Number, required: [true, 'Longitude is required']},
  time: {type: Number, required: [true, 'Time is required']},
  accuracy: {type: Number, required: [true, 'Accuracy is required']},
  provider: {type: String },
  locationProvider: {type: Number },
})