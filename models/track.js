var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Track = new Schema({
  title: { type: String, required: true },
  complete: { type: Boolean, default: false}
});

module.exports = mongoose.model('Track', Track);
