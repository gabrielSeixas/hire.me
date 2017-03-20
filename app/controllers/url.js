const shortid = require('shortid');
const Url = require('../models/url');
const Responses = require('../responses/url');

exports.create = function(req, res, next) {
    const paramUrl = req.query.url;
    const CUSTOM_ALIAS = req.query.CUSTOM_ALIAS || '';

    if (CUSTOM_ALIAS) {
        Url.findOne({ hashUrl: CUSTOM_ALIAS }, (err, urls) => {
            if (urls) {
                res.json(Responses.formatNotCreatedResponse(CUSTOM_ALIAS));    
            } else {
                createUrl(CUSTOM_ALIAS);
            }
        });
    } else {
        createUrl(shortid.generate());
    }

    function createUrl(hash) {
        createNewUrl(req.query.url, hash, (createdUrl) => {
            res.json(Responses.formatUrlSuccessObj(createdUrl));
        });
    }
};

exports.redirectShort = function(req, res, next) {
    Url.findOne({ hashUrl: req.params.hashUrl }, (err, url) => {
        if (err) {
            res.json(err);
        } 

        if (url) {
            res.redirect(url.fullUrl);
        } else {
            res.status(404).json(Responses.notFound(req.params.hashUrl));
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
        res.json(docs);
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

