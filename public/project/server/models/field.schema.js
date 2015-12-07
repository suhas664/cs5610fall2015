'use strict';

module.exports = function(mongoose) {
  	var objectId = mongoose.Schema.Types.ObjectId;
  	var FieldSchema = new mongoose.Schema({
    	id : {
    	  	type: objectId,
    	},
    	label : String,
    	fieldType : {
    	  	type : String
    	},
    	options : [{
    	  	label : String,
    	  	value : String
    	  	}
    	],
    	placeholder : String
  	});
  	return FieldSchema;
};