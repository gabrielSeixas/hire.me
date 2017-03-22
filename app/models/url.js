const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
	fullUrl: {
		type: String,
		validate: {
			validator: (v) => {
				return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(v);
			},
			message: '{VALUE} is not a valid url.'
		}
	},
	accessCount: { type: Number, default: 0 },
	hash: { type: String, unique: true }
});

const ModelClass = mongoose.model('url', urlSchema);
module.exports = ModelClass;