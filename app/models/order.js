var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var OrderSchema   = new Schema({
    pizzeria : String,
    user : {
		name : String,
		surname : String,
		phone : String,
		where : {
			address : String,
			city : String
		},
        uid : String
	},
    pizzaList : [ {
        pizza : String,
        size : Number,
        package: Number
    } ],
	when : {
		preferredTime : Date
	},
    status : {
        workingState : String,
        workingNotes : String,
        when : {
            workingTime : Date
        }
    },
    notes : String
});

module.exports = mongoose.model('order', OrderSchema);
