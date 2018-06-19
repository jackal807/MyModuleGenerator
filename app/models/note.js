var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var NoteSchema   = new Schema({
    name: String,
	thumb: String
});

module.exports = mongoose.model('note', NoteSchema);