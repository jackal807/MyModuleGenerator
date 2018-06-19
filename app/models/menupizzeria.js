var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var MenupizzeriaSchema   = new Schema({
    pizzeria: [{ type: Schema.Types.ObjectId, ref: 'pizzeria' }],
    pizza : [{ type: Schema.Types.ObjectId, ref: 'pizza' }],
    price: Number,
    available: Boolean
});

module.exports = mongoose.model('menupizzeria', MenupizzeriaSchema);
