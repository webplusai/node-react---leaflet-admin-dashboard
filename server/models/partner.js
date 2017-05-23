const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const partnerSchema = new mongoose.Schema({
  _id: String,
  email: { type: String, unique: true, lowercase: true },
  password: String
}, { collection: 'Partner' });

partnerSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('Partner', partnerSchema);
