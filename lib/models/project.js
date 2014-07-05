

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

// ERRO HANDLING:
db.on('error', console.error.bind(console, 'connection error:'));

// SCHEMA:
var projectSchema = new Schema({
    projectName: String,
    contributors: [],
    github: String,
    screenshotLink: String,
    screencastLink: String,
    numberOfLikes: Number,
    twitterShareLink: String,
    facebookShareLink: String,
    googlePlusShareLink: String
});

// SETTING UP THE MODEL:
var Project = mongoose.model('Project', projectSchema);

// EXPORTING THE PROJECT CONSTRUCTOR:
module.exports = { 'Project': Project };






