var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var PizzaSchema   = new Schema({
    name: String,
	ingredients: String
});

module.exports = mongoose.model('pizza', PizzaSchema);