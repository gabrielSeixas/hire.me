const shortid = require('shortid');
const Url = require('../models/url');
const Responses = require('../responses/url');
const Utils = require('../utils');

exports.create = function(req, res, next) {
    const initTime = new Date().getTime();
    const paramUrl = req.query.url;
    const CUSTOM_ALIAS = req.query.CUSTOM_ALIAS || '';

    if (Utils.validateURL(paramUrl)) {
        if (CUSTOM_ALIAS) {
            Url.findOne({ hashUrl: CUSTOM_ALIAS }, (err, urls) => {
                if (urls) {
                    Responses.validationError(res, CUSTOM_ALIAS, "CUSTOM ALIAS ALREADY EXISTS");    
                } else {
                    createUrl(CUSTOM_ALIAS);
                }
            });
        } else {
            createUrl(shortid.generate());
        }
    } else {
        Responses.validationError(res, CUSTOM_ALIAS, "URL IS NOT VALID");
    }

    function createUrl(hash) {
        createNewUrl(req.query.url, hash, (createdUrl) => {
            const timeTaken = new Date().getTime() - initTime;
            Responses.successObjCreation(req, res, createdUrl, `${timeTaken} ms`);
        });
    }
};

exports.redirectShort = function(req, res, next) {
    Url.findOne({ hashUrl: req.params.hashUrl }, (err, url) => {
        if (err) {
            Responses.internalError(res);
        } 

        if (url) {
            res.redirect(url.fullUrl);
        } else {
            Responses.notFoundError(res, req.params.hashUrl);
        }
    });
};

exports.dropAllUrls = function(req, res, next) {
    Url.remove({}, (err) => {
        if (!err) {
            res.json({
                message: 'All urls deleted!'
            });
        }
    });
};

exports.listAll = function(req, res, next) {
    Url.find({}, (err, docs) => {
        Responses.success(res, docs);
    });
};

function createNewUrl(url, hash, callback) {
    let newUrl = new Url({
        fullUrl: url,
        hashUrl: hash
    });
    newUrl.save((err, createdUrl) => {
        callback(createdUrl);
    });
}

