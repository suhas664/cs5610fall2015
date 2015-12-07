'use strict';

module.exports = function (mongoose) {
	var ProjectSchema = new mongoose.Schema({
    	id : mongoose.Schema.Types.ObjectId,
    	title : String,
    	status : String,
    	description : String,
    	gitrepo : String,
      owner : String,
    	users : [String]
  }, {collection: 'cs5610.assignment.project'});
  	return ProjectSchema;
};