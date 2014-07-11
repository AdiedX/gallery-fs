

'use strict';

var underscore = require('underscore');
var mongoose = require('mongoose');
// var Thing = mongoose.model('Thing');
var Project = mongoose.model('Project');

exports.projectFind = function(req, res) {
    console.log(req.params.id);
    return Project.findOne({_id: req.params.id}, function(err, project) {
        if(err) {
            console.log(err);
        }
        console.log("JSON", project);
        res.json(project);
    });
};

exports.projectData = function(req, res){
    return Project.find(function(err, projects){
        if (!err) {
            var projectOutput = underscore.map(projects, function(element){
                return{
                    // PENDING: EXACT DATABASE KEYS
                    id: element._id,
                    devLinkedIn: element.devLinkedIn,
                    devGitHub: element.devGitHub,
                    projectName: element.projectName,
                    projectPitch: element.projectPitch,
                    projectDescription: element.projectDescription,
                    liveUrl: element.url,
                    techTags: element.techTags,
                    developers: element.developers,
                    github: element.github,
                    screenshotLink: element.screenshotLink,
                    screencastLink: element.screencastLink
                };
            });
            return res.json(projectOutput);
        } else{
            res.send(500);
        }
    });
};





