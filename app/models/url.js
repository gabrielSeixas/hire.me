const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    fullUrl: { type: String },
    hashUrl: { type: String, unique: true }
});

const ModelClass = mongoose.model('url', urlSchema);
module.exports = ModelClass;