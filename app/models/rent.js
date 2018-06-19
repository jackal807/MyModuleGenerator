var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var RentSchema   = new Schema({
    username : String,
    from : Date,
    to : Date,
    book : {
        isbn : String,
        title : String,
        author : String,
        publishing : String,
        year : Number
    },
    restitutionDate : Date
});


module.exports = mongoose.model('rent', RentSchema);
