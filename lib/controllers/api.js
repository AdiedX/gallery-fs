

'use strict';

var underscore = require('underscore');
var mongoose = require('mongoose');
// var Thing = mongoose.model('Thing');
var Project = mongoose.model('Project');

exports.projectData = function(req, res){
    return Project.find(function(err, projects){
        if (!err) {
            var projectOutput = underscore.map(projects, function(element){
                return{
                    // PENDING: EXACT DATABASE KEYS
                    id: element._id,
                    projectName: element.title,
                    projectPitch: element.pitch,
                    projectDescription: element.description,
                    developers: element.developers,
                    github: element.github,
                    screenshotLink: element.screenshotLink,
                    screencastLink: element.screencastLink,
                };
            });
            return res.json(projectOutput);
        } else{
            res.send(500);
        }
    });
};





