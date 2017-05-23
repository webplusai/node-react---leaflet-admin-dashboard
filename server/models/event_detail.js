const mongoose = require('mongoose');

const eventDetailSchema = new mongoose.Schema({

}, { collection: 'EventDetail' });

module.exports = mongoose.model('EventDetail', eventDetailSchema);
