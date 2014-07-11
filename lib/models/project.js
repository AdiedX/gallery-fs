

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

// ERRO HANDLING:
db.on('error', console.error.bind(console, 'connection error:'));

// SCHEMA:
var projectSchema = new Schema({
    devLinkedIn: String,
    devGitHub: String,
    projectName: String,
    projectDescription: String,
    projectPitch: String,
    liveUrl: String,
    techTags: Array,
    developers: [],
    github: String,
    screenshotLink: String,
    screencastLink: String,
    numberOfLikes: Number
});

// SETTING UP THE MODEL:
var Project = mongoose.model('Project', projectSchema);

// EXPORTING THE PROJECT CONSTRUCTOR:
module.exports = {'Project': Project};






