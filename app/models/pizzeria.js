var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var PizzeriaSchema   = new Schema({
    name: String,
    menuVersion: Number,
    where: {
        address: String,
        city: String
    },
    phone: String,
    when: {
        openingTime: Date,
        closingTime: Date,
        closureDay: Number
    },
    bigIncrease: Number,
    smallReduction: Number,
    packageCost: Number,
    deliveryCost: Number
});

module.exports = mongoose.model('pizzeria', PizzeriaSchema);