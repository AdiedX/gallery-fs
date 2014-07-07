

'use strict';

var underscore = require('underscore');
var mongoose = require('mongoose');
// var Thing = mongoose.model('Thing');
var Project - mongoose.mode('Project');

exports.projectData = function(req, res){
    return Project.find(function(err, projects){
        if (!err) {
            var projectOutput = underscore.map(projects, function(element){
                return{
                    // PENDING: EXACT DATABASE KEYS
                    id: element._id,
                    projectName: element.title,
                    projectDescription: element.description,
                    developers: element.name,
                    github: element.github,
                    screenshotLink: element.screenshot,
                    screencastLink: element.screencast,
                };
            });
            return res.json(projectOutput);
        } else{
            res.send(500);
        }
    });
};





