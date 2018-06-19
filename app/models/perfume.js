var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Note = require('./note');


var PerfumeSchema   = new Schema({
    name: String,
    url: String,
    thumb: String,
    brand: String,
    brandUrl: String,
    year : Number,
    accordi : [String],
    notes : {
        head : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }],
        heart : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }],
        base : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }]
    }
});

module.exports = mongoose.model('perfume', PerfumeSchema);