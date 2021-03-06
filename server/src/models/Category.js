const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	linkName: {
		type: String
	},
	userId: {
		type: String,
		required: true
	}
})

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
