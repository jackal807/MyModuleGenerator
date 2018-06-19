var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var BrandSchema   = new Schema({
    name: String,
	url: String
});

module.exports = mongoose.model('brand', BrandSchema);